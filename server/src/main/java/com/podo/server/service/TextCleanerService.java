package com.podo.server.service;

import org.springframework.stereotype.Service;

@Service
public class TextCleanerService {

    public String cleanText(String text) {
        // Define the characters you want to remove
        String unwantedChars = "[\\[\\]\"'{}()]+";

        // Replace unwanted characters with an empty string
        return text.replaceAll(unwantedChars, "");
    }
}
