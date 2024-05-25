package com.demoserver.demoserver.services;

import com.demoserver.demoserver.dtos.PatientInfoWithMedicineDto;
import com.demoserver.demoserver.dtos.domainDtos.DiseaseDto;
import com.demoserver.demoserver.dtos.domainDtos.MedicineDto;
import com.demoserver.demoserver.interfaces.IMedicineRepo;
import com.demoserver.demoserver.models.MedicineModel;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAiService {
  @Value("${openai.api.key}")
  private String apiKey;
  @Value("${openai.organization.key}")
  private String organizationKey;
  private final RestTemplate restTemplate;
  private final ObjectMapper objectMapper;
  private final IMedicineRepo iMedicineRepo;

  public String generateQuestionFromDiseaseNames(List<String> diseaseNames) {
    log.info("Generating question from disease names: {}", diseaseNames);
    String beforeString = "내가 이름 배열을 줄게 ";
    String afterString = "이 이름 배열에 질병 이름이 있다면 그것을 꺼내서 데이터를 다음 Json 형식에 맞게 가공해줘 Json 규격 예시는 다음과 같아 [{name: 처음에 받은 질명이름, symptom: 질병증상, precaution: 질병주의사항, prevention: 질병예방법, treatment: 질병치료법}], 가공할 때는 길지 않은 간결한 한글 설명으로 채워야 하고 한글에는 문법적 오류나 오타가 없어야 해, 최종적으로 대답은 다른 설명이나 말은 하지말고 내가 요구한 모든 처리를 한 후 결과는 개행없이 Json만 반환해줘";

    JSONArray jsonArray = new JSONArray(diseaseNames);
    String question = beforeString + jsonArray.toString() + afterString;
    log.info("Generated question: {}", question);
    return question;
  }

  public List<DiseaseDto> analyzeDiseaseByOpenAi(String question) {
    log.info("Analyzing disease by OpenAI with question: {}", question);
    String url = "https://api.openai.com/v1/chat/completions";

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + apiKey);
    headers.set("OpenAI-Organization", organizationKey);
    headers.set("Content-Type", "application/json");

    JSONObject request = new JSONObject();
    request.put("model", "gpt-3.5-turbo");
    JSONArray messages = new JSONArray();
    JSONObject message = new JSONObject();
    message.put("role", "user");
    message.put("content", question);
    messages.put(message);
    request.put("messages", messages);

    HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);

    ResponseEntity<String> responseEntity = restTemplate.exchange(
        url,
        HttpMethod.POST,
        entity,
        String.class);

    String responseBody = responseEntity.getBody();
    log.info("Received response: {}", responseBody);
    List<DiseaseDto> diseaseList = new ArrayList<>();

    try {
      JSONObject jsonResponse = new JSONObject(responseBody);
      JSONArray choices = jsonResponse.getJSONArray("choices");
      JSONObject firstChoice = choices.getJSONObject(0);
      String content = firstChoice.getJSONObject("message").getString("content");

      JSONArray jsonArray = new JSONArray(content);
      for (int i = 0; i < jsonArray.length(); i++) {
        JSONObject jsonObject = jsonArray.getJSONObject(i);
        DiseaseDto disease = new DiseaseDto(
            jsonObject.getString("name"),
            jsonObject.optString("symptom", ""),
            jsonObject.optString("precaution", ""),
            jsonObject.optString("prevention", ""),
            jsonObject.optString("treatment", ""),
            true);
        diseaseList.add(disease);
      }
    } catch (Exception e) {
      log.error("Error while parsing response: ", e);
      throw new RuntimeException("Invalid JSON format received from OpenAI: " + responseBody);
    }

    log.info("Analyzed disease list: {}", diseaseList);
    return diseaseList;
  }

  public String generateQuestionFormMedicineNames(List<JsonNode> jsonArray) {
    log.info("Generating question from medicine names: {}", jsonArray);
    String beforeString = "내가 의약품 데이터를 줄게";
    String middleString = "내가 준 의약품 데이터의 각 항목마다 efficacy를 추가하고 efficacy를 다음 Json에 따라 분류해서 값을 채워, 반드시 Json에 있는 값으로만 분류해야 하고 CLASS_NAME과 ETC_OTC_NAME은 무시하고 분류해, 최대한 미분류의약품으로 분류하지말고 나머지 값 중 조금이라도 해당하는게 있으면 그걸로 분류해, 그런다음에는 각 항목 efficacy다음에 effect, storageMethod, sideEffect, intakeMethod, ingredient, precautions를 추가해서 해당 항목 의약품에 대한 간단한 효과,보관법, 부작용, 복용법, 성분, 주의사항 설명을 길지 않게 짧고 간결하게 적어줘,";
    String afterString = "위 처리를 모두 완료했다면 쓸데없는 말은 하지말고 mapper.readTree에 넣을 수 있는 완성된 Json 배열만 반환해줘";
    String efficacy = "{진통제, 해열제, 항생제, 소염제, 천식 치료제, 고혈압 치료제, 당뇨 치료제, 알레르기 치료제, 항우울제, 위산제, 항결련제, 미분류의약품}";

    String question = beforeString + jsonArray.toString() + middleString + efficacy + afterString;
    log.info("Generated question: {}", question);
    return question;
  }

  public List<MedicineDto> analyzeMedicineByOpenAi(List<JsonNode> medicineInfos) {
    List<MedicineDto> medicineDtos = new ArrayList<>();
    List<JsonNode> remainingMedicineInfos = new ArrayList<>(medicineInfos);

    // ITEM_SEQ 목록을 추출
    List<String> itemSeqList = medicineInfos.stream()
        .map(json -> json.get("ITEM_SEQ").asText())
        .collect(Collectors.toList());

    // medicine 테이블에서 조회
    List<MedicineModel> existingMedicines = iMedicineRepo.findByItemSeqIn(itemSeqList);

    // 조회된 의약품 DTO로 변환하여 medicineDtos에 추가
    for (MedicineModel medicine : existingMedicines) {
      medicineDtos.add(convertToDto(medicine));
    }

    // 조회된 ITEM_SEQ를 가지고 있는 medicineInfos 제거
    for (MedicineModel medicine : existingMedicines) {
      remainingMedicineInfos.removeIf(json -> json.get("ITEM_SEQ").asText().equals(medicine.getItemSeq()));
    }

    // remainingMedicineInfos를 GPT로 처리
    if (!remainingMedicineInfos.isEmpty()) {
      String question = generateQuestionFormMedicineNames(remainingMedicineInfos);

      log.info("Analyzing medicine by OpenAI with question: {}", question);
      String url = "https://api.openai.com/v1/chat/completions";

      HttpHeaders headers = new HttpHeaders();
      headers.set("Authorization", "Bearer " + apiKey);
      headers.set("OpenAI-Organization", organizationKey);
      headers.set("Content-Type", "application/json");

      try {
        ObjectNode request = objectMapper.createObjectNode();
        request.put("model", "gpt-3.5-turbo");

        ArrayNode messages = objectMapper.createArrayNode();
        ObjectNode message = objectMapper.createObjectNode();
        message.put("role", "user");
        message.put("content", question);
        messages.add(message);

        request.set("messages", messages);
        log.info("Sending request to OpenAI: {}", request.toString());

        HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        log.info("Received responseEntity: {}", responseEntity);

        String responseBody = responseEntity.getBody();
        JSONObject jsonResponse = new JSONObject(responseBody);
        JSONArray choices = jsonResponse.getJSONArray("choices");
        JSONObject firstChoice = choices.getJSONObject(0);
        JSONObject text = firstChoice.getJSONObject("message");
        String content = text.getString("content");

        if (!content.startsWith("[")) {
          content = "[" + content + "]";
        }

        JsonNode root = objectMapper.readTree(content);
        List<MedicineModel> newMedicines = new ArrayList<>();
        for (JsonNode node : root) {
          String itemSeq = node.has("ITEM_SEQ") ? node.get("ITEM_SEQ").asText() : "";
          String entpSeq = node.has("ENTP_SEQ") ? node.get("ENTP_SEQ").asText() : "";
          String itemName = node.has("ITEM_NAME") ? node.get("ITEM_NAME").asText() : "";
          String entpName = node.has("ENTP_NAME") ? node.get("ENTP_NAME").asText() : "";
          String chart = node.has("CHART") ? node.get("CHART").asText() : "";
          String itemImage = node.has("ITEM_IMAGE") ? node.get("ITEM_IMAGE").asText() : "";
          String className = node.has("CLASS_NO") ? node.get("CLASS_NO").asText() : "";
          String etcOtcName = node.has("ETC_OTC_NAME") ? node.get("ETC_OTC_NAME").asText() : "";
          String efficacy = node.has("efficacy") ? node.get("efficacy").asText() : "";
          String effect = node.has("effect") ? node.get("effect").asText() : "";
          String manufacturer = node.has("ENTP_NAME") ? node.get("ENTP_NAME").asText() : "";
          String storageMethod = node.has("storageMethod") ? node.get("storageMethod").asText() : "";
          String sideEffect = node.has("sideEffect") ? node.get("sideEffect").asText() : "";
          String intakeMethod = node.has("intakeMethod") ? node.get("intakeMethod").asText() : "";
          String ingredient = node.has("ingredient") ? node.get("ingredient").asText() : "";
          String precautions = node.has("precautions") ? node.get("precautions").asText() : "";

          MedicineModel medicine = MedicineModel.builder()
              .itemSeq(itemSeq)
              .entpSeq(entpSeq)
              .itemName(itemName)
              .entpName(entpName)
              .chart(chart)
              .itemImage(itemImage)
              .className(className)
              .etcOtcName(etcOtcName)
              .efficacy(efficacy)
              .effect(effect)
              .manufacturer(manufacturer)
              .storageMethod(storageMethod)
              .sideEffect(sideEffect)
              .intakeMethod(intakeMethod)
              .ingredient(ingredient)
              .precautions(precautions)
              .build();
          newMedicines.add(medicine);
        }

        log.info("Saving new medicines to repository");
        iMedicineRepo.saveAll(newMedicines);

        // 새로운 의약품 DTO로 변환하여 medicineDtos에 추가
        for (MedicineModel medicine : newMedicines) {
          medicineDtos.add(convertToDto(medicine));
        }

      } catch (Exception e) {
        log.error("Error while parsing response: ", e);
        throw new RuntimeException("Invalid JSON format received from OpenAI: " + e.getMessage());
      }
    }

    log.info("Final analyzed medicine list: {}", medicineDtos);
    return medicineDtos;
  }

  private MedicineDto convertToDto(MedicineModel medicineModel) {
    return new MedicineDto(
        medicineModel.getItemSeq(),
        medicineModel.getEntpSeq(),
        medicineModel.getItemName(),
        medicineModel.getEntpName(),
        medicineModel.getChart(),
        medicineModel.getItemImage(),
        medicineModel.getClassName(),
        medicineModel.getEtcOtcName(),
        medicineModel.getEfficacy(),
        medicineModel.getEffect(),
        medicineModel.getManufacturer(),
        medicineModel.getStorageMethod(),
        medicineModel.getSideEffect(),
        medicineModel.getIntakeMethod(),
        medicineModel.getIngredient(),
        medicineModel.getPrecautions());
  }

  public String generateQuestionFormConflict(PatientInfoWithMedicineDto patientInfoWithMedicineDto) {
    String beforeString = "내가 데이터를 줄게";
    String middleString = "내가 준 의약품 데이터의 patientInfo는 환자기 기존에 가지고 있던 신체정보, 보유 질병 정보, 보유 의약품 정보야, 그리고 analyzeMedicine는 새롭게 추가하려고 하는 의약품 리스트야. 새로 추가하려는 의약품이 기존의 신체정보, 질병정보, 의약품 정보와 충돌하여 부작용을 발생시킨다면 다음의 json 리스트를 작성해줘 analyzeList: [{target: 문제가 발생하는 analyzeMedicine의 의약품 itemSeq, type: 충돌되는 대상 타입(신체정보, 질병정보, 의약품정보), typeTarget: 충돌되는 대상 정보(신체정보는 age, height, weight, gender 중 하나, 질병정보는 질병 name, 의약품 정보는  itemSeq), description: 충돌 원인과 부작용, level: 위험도에 따라 warning 또는 danger }] 위 처리를 모두 완료했다면 쓸데없는 말은 하지말고 analyzeList JsonArray만 반환해줘";

    String question = beforeString + patientInfoWithMedicineDto.toString() + middleString;
    return question;
  }

  public String analyzeConflictByOpenAi(PatientInfoWithMedicineDto patientInfoWithMedicineDto) {
    String question = generateQuestionFormConflict(patientInfoWithMedicineDto);

    log.info("Analyzing medicine by OpenAI with question: {}", question);
    String url = "https://api.openai.com/v1/chat/completions";

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + apiKey);
    headers.set("OpenAI-Organization", organizationKey);
    headers.set("Content-Type", "application/json");

    try {
      ObjectNode request = objectMapper.createObjectNode();
      request.put("model", "gpt-3.5-turbo");

      ArrayNode messages = objectMapper.createArrayNode();
      ObjectNode message = objectMapper.createObjectNode();
      message.put("role", "user");
      message.put("content", question);
      messages.add(message);

      request.set("messages", messages);
      log.info("Sending request to OpenAI: {}", request.toString());

      HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);
      ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
      log.info("Received responseEntity: {}", responseEntity);

      String responseBody = responseEntity.getBody();
      JSONObject jsonResponse = new JSONObject(responseBody);
      JSONArray choices = jsonResponse.getJSONArray("choices");
      JSONObject firstChoice = choices.getJSONObject(0);
      JSONObject text = firstChoice.getJSONObject("message");
      String content = text.getString("content");

      if (!content.startsWith("[")) {
        content = "[" + content + "]";
      }
      return content;

    } catch (Exception e) {
      log.error("Error while parsing response: ", e);
      throw new RuntimeException("Invalid JSON format received from OpenAI: " + e.getMessage());
    }

  }
}
