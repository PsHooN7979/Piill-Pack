package com.podo.server.controller;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;

@RestController
public class ImageController {

    @PostMapping("/convertBase64ToJpg")
    public String convertBase64ToJpg(@RequestBody String base64String) {
        // Extract the base64 data from the request body
        String base64Data = base64String.split(",")[1];

        // Decode Base64 string to byte array
        byte[] decodedBytes = Base64.getDecoder().decode(base64Data);

        // Write byte array to a JPG file
        String outputFile = "output.jpg";
        try (FileOutputStream fos = new FileOutputStream(outputFile)) {
            FileCopyUtils.copy(decodedBytes, fos);
        } catch (IOException e) {
            return "Error converting Base64 to JPG: " + e.getMessage();
        }

        return "Image saved to: " + outputFile;
    }
}
