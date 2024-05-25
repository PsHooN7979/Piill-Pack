package com.demoserver.demoserver.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class NaverOCRService {

  @Value("${naver.service.url}")
  private String apiUrl;
  @Value("${naver.service.secretKey}")
  private String secretKey;

  public String callNaverOcrApi(Path imagePath) throws IOException {
    URL url = new URL(apiUrl);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("POST");
    String boundary = "Boundary-" + UUID.randomUUID().toString();
    connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
    connection.setRequestProperty("X-OCR-SECRET", secretKey);
    connection.setDoOutput(true);

    try (DataOutputStream os = new DataOutputStream(connection.getOutputStream())) {
      String newLine = "\r\n";
      String fileName = imagePath.getFileName().toString();

      String jsonPart = "--" + boundary + newLine +
          "Content-Disposition: form-data; name=\"message\"" + newLine +
          "Content-Type: application/json; charset=UTF-8" + newLine + newLine +
          "{\"version\": \"V2\", \"requestId\": \"" + UUID.randomUUID() + "\", \"timestamp\": "
          + System.currentTimeMillis() + ", \"images\": [{\"name\": \"" + fileName
          + "\", \"format\": \"png\", \"data\": \"\"}]}"
          + newLine;

      String filePart = "--" + boundary + newLine +
          "Content-Disposition: form-data; name=\"file\"; filename=\"" + fileName + "\"" + newLine +
          "Content-Type: image/png" + newLine + newLine;

      String closingBoundary = newLine + "--" + boundary + "--" + newLine;

      os.writeBytes(jsonPart);
      os.writeBytes(filePart);
      Files.copy(imagePath, os);
      os.writeBytes(closingBoundary);

      os.flush();
    }

    int responseCode = connection.getResponseCode();
    if (responseCode == HttpURLConnection.HTTP_OK) {
      try (InputStream is = connection.getInputStream()) {
        return new String(is.readAllBytes());
      }
    } else {
      try (InputStream is = connection.getErrorStream()) {
        String errorMessage = new String(is.readAllBytes());
        log.error("OCR API error: {}", errorMessage);
        throw new IOException("Failed to get OCR results");
      }
    }
  }
}
