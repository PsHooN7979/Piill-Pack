package com.podo.server.controller;

import com.podo.server.service.NaverOcrApi;
import com.podo.server.service.TextCleanerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CheckController {
    private final NaverOcrApi naverApi;
    private final TextCleanerService textCleanerService;

    @Value("${naver.service.secretKey}")
    private String secretKey;

    @GetMapping("/naverOcr")
    public ResponseEntity<String> ocr() throws IOException {
        String fileName = "test.jpg"; // 파일 이름
        File file = ResourceUtils.getFile("classpath:static/image/" + fileName);

        List<String> result = naverApi.callApi("POST", file.getPath(), "jpg");
        if (result != null) {
            StringBuilder extractedText = new StringBuilder();
            for (String s : result) {
                log.info(s);
                extractedText.append(s).append(" ");
            }

            // Clean the extracted text
            String cleanedText = textCleanerService.cleanText(extractedText.toString());

            return new ResponseEntity<>(cleanedText.trim(), HttpStatus.OK);
        } else {
            log.info("null");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}