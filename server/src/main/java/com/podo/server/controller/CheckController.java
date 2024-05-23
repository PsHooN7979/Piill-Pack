package com.podo.server.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.podo.server.service.MedicineService;
import com.podo.server.service.NaverOcrApi;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.logging.Logger;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CheckController {

    private static final Logger logger = Logger.getLogger(CheckController.class.getName());
    private final NaverOcrApi naverApi;
    private final MedicineService medicineService;

    @Value("${naver.service.secretKey}")
    private String secretKey;

    static class Base64Request {
        private String base64String;

        // Getter and Setter methods
        public String getBase64String() {
            return base64String;
        }

        public void setBase64String(String base64String) {
            this.base64String = base64String;
        }
    }

    @PostMapping("/processImage")
    public ResponseEntity<?> processImage(@RequestBody Base64Request request) throws IOException {
        String base64String = request.getBase64String();
        if (base64String == null || base64String.isEmpty()) {
            logger.severe("Invalid Base64 data: String is null or empty");
            return ResponseEntity.badRequest().body("Invalid Base64 data");
        }

        logger.info(
                "Received Base64 string: " + base64String.substring(0, Math.min(base64String.length(), 50)) + "...");

        // Base64 -> JPG 변환
        base64String = base64String.trim().replaceAll("[^A-Za-z0-9+/=]", "");
        logger.info("Cleaned Base64 string: " + base64String.substring(0, Math.min(base64String.length(), 50)) + "...");

        byte[] decodedBytes;
        try {
            decodedBytes = Base64.getDecoder().decode(base64String);
            logger.info("Decoded byte array length: " + decodedBytes.length);
        } catch (IllegalArgumentException e) {
            logger.severe("Failed to decode Base64 string: " + e.getMessage());
            return ResponseEntity.badRequest().body("Failed to decode Base64 string: " + e.getMessage());
        }

        if (decodedBytes.length == 0) {
            logger.severe("Decoded byte array is empty");
            return ResponseEntity.badRequest().body("Decoded byte array is empty");
        }

        String outputDir = "src/main/resources/static/image";
        File dir = new File(outputDir);
        if (!dir.exists()) {
            if (!dir.mkdirs()) {
                logger.severe("Failed to create directory: " + outputDir);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to create directory: " + outputDir);
            }
        }

        String outputFile = outputDir + "/test.jpg";
        try (FileOutputStream fos = new FileOutputStream(outputFile)) {
            FileCopyUtils.copy(decodedBytes, fos);
            logger.info("Image successfully saved to: " + outputFile);
        } catch (IOException e) {
            logger.severe("Error writing JPG file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error writing JPG file: " + e.getMessage());
        }

        // Process the saved image with OCR and get medicine information
        List<Map<String, Object>> medicineInfos = processOcrAndGetMedicineInfo(outputFile);
        if (medicineInfos == null || medicineInfos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No medicine information found.");
        }

        return ResponseEntity.ok(medicineInfos);
    }

    private List<Map<String, Object>> processOcrAndGetMedicineInfo(String filePath) throws IOException {
        List<String> result = naverApi.callApi("POST", filePath, "jpg");
        if (result != null) {
            StringBuilder extractedText = new StringBuilder();
            for (String s : result) {
                extractedText.append(s).append(" ");
            }
            String fullText = extractedText.toString().trim();
            String filteredText = filterNineDigitSequences(fullText);

            List<String> ediCodes = Arrays.asList(filteredText.split("\\s+"));
            log.info(ediCodes.toString());

            if (!ediCodes.isEmpty()) {
                // Call the medicine API using the extracted EDI codes
                List<Map<String, Object>> medicineInfos = new ArrayList<>();
                ObjectMapper objectMapper = new ObjectMapper();
                for (String ediCode : ediCodes) {
                    String medicineInfo = getMedicineInfo(ediCode);
                    if (medicineInfo != null) {
                        try {
                            List<Map<String, Object>> medicineInfoList = objectMapper.readValue(medicineInfo,
                                    new TypeReference<List<Map<String, Object>>>() {
                                    });
                            if (medicineInfoList != null) {
                                medicineInfos.addAll(medicineInfoList);
                            }
                        } catch (IOException e) {
                            log.error("Failed to parse medicine information JSON: {}", medicineInfo);
                        }
                    }
                }
                log.info(medicineInfos.toString());
                return medicineInfos;
            }
        }
        return Collections.emptyList();
    }

    private String filterNineDigitSequences(String text) {
        Pattern pattern = Pattern.compile("\\b\\d{9}\\b");
        Matcher matcher = pattern.matcher(text);
        StringBuilder filteredText = new StringBuilder();
        while (matcher.find()) {
            filteredText.append(matcher.group()).append(" ");
        }
        return filteredText.toString().trim();
    }

    private String getMedicineInfo(String ediCode) throws IOException {
        String serviceKey = "8XF02UiqBjMacUjtyAJt3BuzIPOJjO1MCdRSqeekt68l59GJY2unB1%2FFfl%2BQaP49h6fIN8aiNdIXnft2F3YT1w%3D%3D"; // use
                                                                                                                                // the
                                                                                                                                // secretKey
                                                                                                                                // from
                                                                                                                                // the
                                                                                                                                // configuration
        String pageNo = "1";
        String numOfRows = "3";
        String type = "json";

        String encodedEdiCode = URLEncoder.encode(ediCode, "UTF-8");
        String urlStr = String.format(
                "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01?serviceKey=%s&edi_code=%s&pageNo=%s&numOfRows=%s&type=%s",
                serviceKey, encodedEdiCode, pageNo, numOfRows, type);

        HttpURLConnection urlConnection = null;
        InputStream stream = null;
        int retryCount = 3;
        IOException lastException = null;

        for (int i = 0; i < retryCount; i++) {
            try {
                URL url = new URL(urlStr);
                urlConnection = (HttpURLConnection) url.openConnection();
                stream = getNetworkConnection(urlConnection);

                int responseCode = urlConnection.getResponseCode();
                if (responseCode != HttpURLConnection.HTTP_OK) {
                    String errorResponse = readStreamToString(urlConnection.getErrorStream());
                    log.error("Error response from API: {}", errorResponse);
                    throw new IOException("HTTP error code : " + responseCode);
                }

                String result = readStreamToString(stream);
                if (stream != null)
                    stream.close();
                return medicineService.transformResponse(result);
            } catch (IOException e) {
                lastException = e;
                if (stream != null)
                    try {
                        stream.close();
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    }
                if (urlConnection != null)
                    urlConnection.disconnect();
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

    private InputStream getNetworkConnection(HttpURLConnection urlConnection) throws IOException {
        urlConnection.setConnectTimeout(10000); // 10 seconds for connection timeout
        urlConnection.setReadTimeout(10000); // 10 seconds for read timeout
        urlConnection.setRequestMethod("GET");
        urlConnection.setDoInput(true);

        if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new IOException("HTTP error code : " + urlConnection.getResponseCode());
        }
        return urlConnection.getInputStream();
    }

    private String readStreamToString(InputStream stream) throws IOException {
        StringBuilder result = new StringBuilder();
        BufferedReader br = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
        String readLine;
        while ((readLine = br.readLine()) != null) {
            result.append(readLine).append("\n\r");
        }
        br.close();
        return result.toString();
    }
}
