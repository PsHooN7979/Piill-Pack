package com.podo.server.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class MedicineController {

    @GetMapping("/medicine")
    public String medicineApi(@RequestParam(value = "edi_code", required = false) String ediCode,
                              @RequestParam(value = "item_name", required = false) String itemName) throws IOException {
        StringBuilder result = new StringBuilder();

        String serviceKey = "8XF02UiqBjMacUjtyAJt3BuzIPOJjO1MCdRSqeekt68l59GJY2unB1%2FFfl%2BQaP49h6fIN8aiNdIXnft2F3YT1w%3D%3D";
        String pageNo = "1";
        String numOfRows = "3";
        String type = "json";

        // Encode the edi_code to handle special characters in the URL
        String encodedEdiCode = URLEncoder.encode(ediCode == null ? "" : ediCode, "UTF-8");
        String encodedItemName = URLEncoder.encode(itemName == null ? "" : itemName, "UTF-8");

        String urlStr = String.format(
                "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01?serviceKey=%s&item_name=%s&pageNo=%s&numOfRows=%s&edi_code=%s&type=%s",
                serviceKey, encodedItemName, pageNo, numOfRows, encodedEdiCode, type
        );
        URL url = new URL(urlStr);

        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");

        BufferedReader br;

        br= new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

        String returnLine;

        while ((returnLine = br.readLine()) != null){
            result.append(returnLine+"\n\r");
        }

        urlConnection.disconnect();;

    return result.toString();
    }



}
