package com.podo.server.service;

import org.springframework.stereotype.Service;


//OCR 사용 시 제외할 단어 재외시켜주는 것
@Service
public class TextCleanerService {

    public String cleanText(String text) {
        // Define the characters you want to remove
        String unwantedChars = "[\\[\\]\"'{}()]+";

        // Replace unwanted characters with an empty string
        return text.replaceAll(unwantedChars, "");
    }
}
