package com.podo.server.controller;

import com.podo.server.dto.OcrResponseDto;
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
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CheckController {
    private final NaverOcrApi naverApi;

    @Value("${naver.service.secretKey}")
    private String secretKey;

    @GetMapping("/naverOcr")
    public ResponseEntity<OcrResponseDto> ocr() throws IOException {
        String fileName = "test.jpg"; // 파일 이름
        File file = ResourceUtils.getFile("classpath:static/image/" + fileName);

        List<String> result = naverApi.callApi("POST", file.getPath(), "jpg");
        if (result != null) {
            StringBuilder extractedText = new StringBuilder();
            for (String s : result) {
//                log.info(s);
                extractedText.append(s).append(" ");
            }
            String fullText = extractedText.toString().trim();
            String filteredText = filterNineDigitSequences(fullText);

            List<String> words = Arrays.asList(filteredText.split("\\s+"));
            log.info(words.toString());
            OcrResponseDto responseDTO = new OcrResponseDto(words);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
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
}