package com.podo.server.controller;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.podo.server.dto.DiseaseDto;
import com.podo.server.dto.GPTRequest;
import com.podo.server.dto.GPTResponse;
//import com.podo.server.service.DiseaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class GPTController {
    @Value("${gpt.model}")
    private String model;

    @Value("${gpt.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

//    private final DiseaseService diseaseService;
    private final ObjectMapper objectMapper;


    @GetMapping("/chat")
    public String chat(@RequestParam("prompt") String prompt){

        GPTRequest request = new GPTRequest(
                model,prompt,1,4096,1,2,2);

        GPTResponse gptResponse = restTemplate.postForObject(
                apiUrl,
                request,
                GPTResponse.class
        );


        String responseContent =  gptResponse.getChoices().get(0).getMessage().getContent();

        // GPT 응답을 DiseaseDto로 변환
//        DiseaseDto diseaseDto = parseResponseToDiseaseDto(responseContent);

        // DiseaseDto를 데이터 베이스에 저장
//        diseaseService.saveDisease(diseaseDto);

        return responseContent;



    }

//    private DiseaseDto parseResponseToDiseaseDto(String responseContent) {
//        // responsecontent를 파싱하여 DiseaseDto 객체를 생성하는 로직
//        try {
//            JsonNode jsonNode = objectMapper.readTree(responseContent);
//
//            String name = jsonNode.path("Disease name").toString();
//            String symptoms = jsonNode.path("Disease symptoms").toString();
//            String cause = jsonNode.path("Cause of disease").toString();
//            String prevention = jsonNode.path("Disease prevention methods").toString();
//
//            return DiseaseDto.builder()
//                    .name(name)
//                    .symptoms(symptoms)
//                    .cause(cause)
//                    .prevention(prevention)
//                    .build();
//        } catch (Exception e) {
//            // 예외 처리 로직 추가
//            e.printStackTrace();
//            return null;
//        }
//    }
}
