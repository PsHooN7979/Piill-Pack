package com.demoserver.demoserver.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrescriptionService {

  private final NaverOCRService naverOCRService;
  private final String imageUploadDir = "src/main/resources/static/images";

  public String processBase64Image(String base64Image) throws IOException {
    byte[] decodedBytes = Base64.getDecoder().decode(base64Image);
    Path imagePath = saveImageToFile(decodedBytes);

    try {
      return naverOCRService.callNaverOcrApi(imagePath);
    } finally {
      log.info("Deleting image file: {}", imagePath);
      Files.deleteIfExists(imagePath);
    }
  }

  private Path saveImageToFile(byte[] imageBytes) throws IOException {
    String fileName = UUID.randomUUID().toString() + ".png";
    Path imagePath = Paths.get(imageUploadDir, fileName);
    Files.createDirectories(imagePath.getParent());
    Files.write(imagePath, imageBytes);
    log.info("Image saved to: {}", imagePath);
    return imagePath;
  }

  private static final Pattern NINE_DIGIT_PATTERN = Pattern.compile("\\b\\d{9}\\b");

  public List<String> extractNineDigitNumbers(String ocrResult) {
    List<String> numbers = new ArrayList<>();
    Matcher matcher = NINE_DIGIT_PATTERN.matcher(ocrResult);
    while (matcher.find()) {
      numbers.add(matcher.group());
    }
    return numbers;
  }

  private final String serviceKey = "8XF02UiqBjMacUjtyAJt3BuzIPOJjO1MCdRSqeekt68l59GJY2unB1%2FFfl%2BQaP49h6fIN8aiNdIXnft2F3YT1w%3D%3D";
  private final int retryCount = 3;
  private final ObjectMapper objectMapper = new ObjectMapper();

  public List<JsonNode> getMedicineInfo(List<String> mediCodes) throws IOException {
    List<JsonNode> medicineInfos = new ArrayList<>();
    for (String mediCode : mediCodes) {
      JsonNode medicineInfo = fetchMedicineInfo(mediCode);
      if (medicineInfo != null) {
        medicineInfos.add(medicineInfo);
      }
    }
    List<JsonNode> medicineDatas = new ArrayList<>();
    for (JsonNode info : medicineInfos) {
      if (info.has("body") && info.get("body").has("items")) {
        ArrayNode items = (ArrayNode) info.path("body").path("items");
        items.forEach(medicineDatas::add);
      }
    }

    return medicineDatas;

  }

  private JsonNode fetchMedicineInfo(String mediCode) throws IOException {
    String pageNo = "1";
    String numOfRows = "3";
    String type = "json";

    String encodedEdiCode = URLEncoder.encode(mediCode, "UTF-8");
    String urlStr = String.format(
        "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01?serviceKey=%s&edi_code=%s&pageNo=%s&numOfRows=%s&type=%s",
        serviceKey, encodedEdiCode, pageNo, numOfRows, type);

    IOException lastException = null;

    for (int i = 0; i < retryCount; i++) {
      HttpURLConnection urlConnection = null;
      InputStream stream = null;
      try {
        URL url = new URL(urlStr);
        urlConnection = (HttpURLConnection) url.openConnection();
        stream = urlConnection.getInputStream();

        int responseCode = urlConnection.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
          String errorResponse = new String(stream.readAllBytes());
          log.error("Error response from API: {}", errorResponse);
          throw new IOException("HTTP error code : " + responseCode);
        }

        String result = new String(stream.readAllBytes());
        return objectMapper.readTree(result); // Parse JSON response and return as JsonNode

      } catch (IOException e) {
        lastException = e;
        if (stream != null) {
          try {
            stream.close();
          } catch (IOException ex) {
            ex.printStackTrace();
          }
        }
        if (urlConnection != null) {
          urlConnection.disconnect();
        }
        if (i < retryCount - 1) {
          try {
            Thread.sleep(2000); // wait for 2 seconds before retrying
          } catch (InterruptedException ignored) {
          }
        }
      }
    }
    throw lastException;
  }
}
