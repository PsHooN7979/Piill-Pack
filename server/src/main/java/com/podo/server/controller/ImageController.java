package com.podo.server.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.logging.Logger;



@RestController
public class ImageController {

    private static final Logger logger = Logger.getLogger(ImageController.class.getName());

    static class Base64Request {
        public String base64String;

        // Getter and Setter methods
        public String getBase64String() {
            return base64String;
        }

        public void setBase64String(String base64String) {
            this.base64String = base64String;
        }
    }

    @PostMapping("/convertBase64ToJpg")
    public String convertBase64ToJpg(@RequestBody Base64Request request) {
        String base64String = request.getBase64String();
        if (base64String == null || base64String.isEmpty()) {
            logger.severe("Invalid Base64 data: String is null or empty");
            return "Invalid Base64 data";
        }

        logger.info("Received Base64 string: " + base64String.substring(0, Math.min(base64String.length(), 50)) + "...");

        base64String = base64String.trim().replaceAll("[^A-Za-z0-9+/=]", "");
        logger.info("Cleaned Base64 string: " + base64String.substring(0, Math.min(base64String.length(), 50)) + "...");

        byte[] decodedBytes;
        try {
            decodedBytes = Base64.getDecoder().decode(base64String);
            logger.info("Decoded byte array length: " + decodedBytes.length);
        } catch (IllegalArgumentException e) {
            logger.severe("Failed to decode Base64 string: " + e.getMessage());
            return "Failed to decode Base64 string: " + e.getMessage();
        }

        if (decodedBytes.length == 0) {
            logger.severe("Decoded byte array is empty");
            return "Decoded byte array is empty";
        }

        String outputDir = "src/main/resources/static/image";
        File dir = new File(outputDir);
        if (!dir.exists()) {
            if (!dir.mkdirs()) {
                logger.severe("Failed to create directory: " + outputDir);
                return "Failed to create directory: " + outputDir;
            }
        }

        String outputFile = outputDir + "/output.jpg";
        try (FileOutputStream fos = new FileOutputStream(outputFile)) {
            FileCopyUtils.copy(decodedBytes, fos);
            logger.info("Image successfully saved to: " + outputFile);
        } catch (IOException e) {
            logger.severe("Error writing JPG file: " + e.getMessage());
            return "Error writing JPG file: " + e.getMessage();
        }

        return "Image saved to: " + outputFile;
    }
}