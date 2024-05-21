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
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CheckController {
    private final NaverOcrApi naverApi;
    private final MedicineService medicineService;

    @Value("${naver.service.secretKey}")
    private String secretKey;

    @GetMapping("/naverOcr")
    public ResponseEntity<List<Map<String, Object>>> ocr() throws IOException {
        String fileName = "test.jpg"; // 파일 이름
        File file = ResourceUtils.getFile("classpath:static/image/" + fileName);

        List<String> result = naverApi.callApi("POST", file.getPath(), "jpg");
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
                        List<Map<String, Object>> medicineInfoList = objectMapper.readValue(medicineInfo, new TypeReference<List<Map<String, Object>>>() {});
                        if (medicineInfoList != null) {
                            medicineInfos.addAll(medicineInfoList);
                        }
                    }
                }
                return new ResponseEntity<>(medicineInfos, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } else {
            log.info("null");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
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
        String serviceKey = "8XF02UiqBjMacUjtyAJt3BuzIPOJjO1MCdRSqeekt68l59GJY2unB1%2FFfl%2BQaP49h6fIN8aiNdIXnft2F3YT1w%3D%3D";
        String pageNo = "1";
        String numOfRows = "3";
        String type = "json";

        String encodedEdiCode = URLEncoder.encode(ediCode, "UTF-8");
        String urlStr = String.format(
                "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01?serviceKey=%s&edi_code=%s&pageNo=%s&numOfRows=%s&type=%s",
                serviceKey, encodedEdiCode, pageNo, numOfRows, type
        );

        HttpURLConnection urlConnection = null;
        InputStream stream = null;
        int retryCount = 3;
        IOException lastException = null;

        for (int i = 0; i < retryCount; i++) {
            try {
                URL url = new URL(urlStr);
                urlConnection = (HttpURLConnection) url.openConnection();
                stream = getNetworkConnection(urlConnection);
                String result = readStreamToString(stream);

                if (stream != null) stream.close();
                return medicineService.transformResponse(result);
            } catch (IOException e) {
                lastException = e;
                if (stream != null) try { stream.close(); } catch (IOException ex) { ex.printStackTrace(); }
                if (urlConnection != null) urlConnection.disconnect();
                if (i < retryCount - 1) {
                    try {
                        Thread.sleep(2000);  // wait for 2 seconds before retrying
                    } catch (InterruptedException ignored) {
                    }
                }
            }
        }
        throw lastException;
    }

    private InputStream getNetworkConnection(HttpURLConnection urlConnection) throws IOException {
        urlConnection.setConnectTimeout(10000);  // 10 seconds for connection timeout
        urlConnection.setReadTimeout(10000);     // 10 seconds for read timeout
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
