package com.podo.server.controller;

import com.podo.server.dto.MediBody;
import com.podo.server.service.MedicineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class MedicineController {


    private final MedicineService medicineService;

    @GetMapping("/medicine")
    public ResponseEntity<MediBody> medicineApi(
            @RequestParam(value = "edi_code", required = false) String ediCode,
            @RequestParam(value = "item_name", required = false) String itemName) throws IOException {
        String result = null;
        HttpURLConnection urlConnection = null;
        InputStream stream = null;


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

        try {
            URL url = new URL(urlStr);
            /*  URL 형식이 잘못된 경우 MalformedURLException을 throw */
            urlConnection = (HttpURLConnection) url.openConnection();
            stream = getNetworkConnection(urlConnection);
            result = readStreamToString(stream);

            if (stream != null) stream.close();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
        }
        MediBody body = medicineService.parsingJsonObject(result);
        return new ResponseEntity<>(body, HttpStatus.OK);

    }

    /* URLConnection 을 전달받아 연결정보 설정 후 연결, 연결 후 수신한 InputStream 반환 */
    private InputStream getNetworkConnection(HttpURLConnection urlConnection) throws IOException {
        urlConnection.setConnectTimeout(3000);
        // 연결 타임아웃 값
        urlConnection.setReadTimeout(3000);
        // 읽기 타임아웃 값
        urlConnection.setRequestMethod("GET");
        // HTTP 메서드 GET, POST, HEAD, OPTIONS, PUT, DELETE, TRACE 중 하나를 URL 요청에 대한 메소드로 설정
        urlConnection.setDoInput(true);
        // URLConnetion을 서버에서 콘텐츠를 읽는 데 사용할 수 있는지 여부를 설정

        if(urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new IOException("HTTP error code : " + urlConnection.getResponseCode());
        }
        return urlConnection.getInputStream();
    }

    /* InputStream을 전달받아 문자열로 변환 후 반환 */
    private String readStreamToString(InputStream stream) throws IOException{
        StringBuilder result = new StringBuilder();

        BufferedReader br = new BufferedReader(new InputStreamReader(stream, "UTF-8"));

        String readLine;
        while ((readLine = br.readLine()) != null) {
            result.append(readLine + "\n\r");
        }
        br.close();

        return result.toString();

    }




}
