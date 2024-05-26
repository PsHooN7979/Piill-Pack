package com.demoserver.demoserver.services;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.demoserver.demoserver.dtos.PatientInfoDto;
import com.demoserver.demoserver.dtos.PatientInfoWithMedicineDto;
import com.demoserver.demoserver.dtos.domainDtos.MedicineDto;
import com.demoserver.demoserver.interfaces.IDangerRepo;
import com.demoserver.demoserver.interfaces.IDiseaseRepo;
import com.demoserver.demoserver.interfaces.IMedicineRepo;
import com.demoserver.demoserver.interfaces.IPrescriptionMedicineBridgeRepo;
import com.demoserver.demoserver.interfaces.IPrescriptionRepo;
import com.demoserver.demoserver.interfaces.IWarningRepo;
import com.demoserver.demoserver.models.DangerModel;
import com.demoserver.demoserver.models.DiseaseModel;
import com.demoserver.demoserver.models.MedicineModel;
import com.demoserver.demoserver.models.PatientModel;
import com.demoserver.demoserver.models.PrescriptionModel;
import com.demoserver.demoserver.models.WarningModel;
import com.demoserver.demoserver.models.bridges.PrescriptionMedicineBridgeModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

  private final NaverOCRService naverOCRService;
  private final String imageUploadDir = "src/main/resources/static/images";

  private final OpenAiService openAiService;
  private final IPrescriptionRepo iPrescriptionRepo;
  private final IMedicineRepo iMedicineRepo;
  private final IPrescriptionMedicineBridgeRepo iPrescriptionMedicineBridgeRepo;
  private final PatientService patientService;
  private final IDiseaseRepo iDiseaseRepo;
  private final IWarningRepo iWarningRepo;
  private final IDangerRepo iDangerRepo;

  public String processBase64Image(String base64Image) throws IOException {
    byte[] decodedBytes = Base64.getDecoder().decode(base64Image);
    Path imagePath = saveImageToFile(decodedBytes);

    try {
      return naverOCRService.callNaverOcrApi(imagePath);
    } finally {

      Files.deleteIfExists(imagePath);
    }
  }

  private Path saveImageToFile(byte[] imageBytes) throws IOException {
    String fileName = UUID.randomUUID().toString() + ".png";
    Path imagePath = Paths.get(imageUploadDir, fileName);
    Files.createDirectories(imagePath.getParent());
    Files.write(imagePath, imageBytes);

    return imagePath;
  }

  private static final Pattern NINE_DIGIT_PATTERN = Pattern.compile("\\b\\d{9}\\b");

  public List<String> extractNineDigitNumbers(String ocrResult) {
    List<String> numbers = new ArrayList<>();
    Matcher matcher = NINE_DIGIT_PATTERN.matcher(ocrResult);
    while (matcher.find()) {
      numbers.add(matcher.group());
    }
    return numbers;
  }

  private final String serviceKey = "8XF02UiqBjMacUjtyAJt3BuzIPOJjO1MCdRSqeekt68l59GJY2unB1%2FFfl%2BQaP49h6fIN8aiNdIXnft2F3YT1w%3D%3D";
  private final int retryCount = 3;
  private final ObjectMapper objectMapper = new ObjectMapper();

  public List<JsonNode> getMedicineInfo(List<String> mediCodes) throws IOException {
    List<JsonNode> medicineInfos = new ArrayList<>();
    for (String mediCode : mediCodes) {
      JsonNode medicineInfo = fetchMedicineInfo(mediCode);
      if (medicineInfo != null) {
        medicineInfos.add(medicineInfo);
      }
    }
    List<JsonNode> medicineDatas = new ArrayList<>();
    for (JsonNode info : medicineInfos) {
      if (info.has("body") && info.get("body").has("items")) {
        ArrayNode items = (ArrayNode) info.path("body").path("items");
        items.forEach(medicineDatas::add);
      }
    }

    return medicineDatas;

  }

  private JsonNode fetchMedicineInfo(String mediCode) throws IOException {
    String pageNo = "1";
    String numOfRows = "3";
    String type = "json";

    String encodedEdiCode = URLEncoder.encode(mediCode, "UTF-8");
    String urlStr = String.format(
        "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01?serviceKey=%s&edi_code=%s&pageNo=%s&numOfRows=%s&type=%s",
        serviceKey, encodedEdiCode, pageNo, numOfRows, type);

    IOException lastException = null;

    for (int i = 0; i < retryCount; i++) {
      HttpURLConnection urlConnection = null;
      InputStream stream = null;
      try {
        URL url = new URL(urlStr);
        urlConnection = (HttpURLConnection) url.openConnection();
        stream = urlConnection.getInputStream();

        int responseCode = urlConnection.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
          String errorResponse = new String(stream.readAllBytes());

          throw new IOException("HTTP error code : " + responseCode);
        }

        String result = new String(stream.readAllBytes());
        return objectMapper.readTree(result);

      } catch (IOException e) {
        lastException = e;
        if (stream != null) {
          try {
            stream.close();
          } catch (IOException ex) {
            ex.printStackTrace();
          }
        }
        if (urlConnection != null) {
          urlConnection.disconnect();
        }
        if (i < retryCount - 1) {
          try {
            Thread.sleep(2000);
          } catch (InterruptedException ignored) {
          }
        }
      }
    }
    throw lastException;
  }

  public void registerPrescription(PatientModel patientModel, MedicineRequest request) {
    String prescriptionName = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH:mm:ss"));

    PrescriptionModel prescription = PrescriptionModel.builder()
        .name(prescriptionName)
        .patient(patientModel)
        .build();

    prescription = iPrescriptionRepo.save(prescription);
    final PrescriptionModel finalPrescription = prescription;

    PatientInfoDto patientInfoDto = patientService.getPatientInfo(patientModel.getUuid());
    PatientInfoWithMedicineDto responseDto = new PatientInfoWithMedicineDto(patientInfoDto,
        request.getAnalyzeMedicine());

    String result = openAiService.analyzeConflictByOpenAi(responseDto);

    List<ResultDto> resultDtos;
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      resultDtos = objectMapper.readValue(result,
          objectMapper.getTypeFactory().constructCollectionType(List.class, ResultDto.class));
    } catch (JsonProcessingException e) {
      throw new RuntimeException("Error processing JSON", e);
    }

    List<PrescriptionMedicineBridgeModel> bridgeModels = request.getAnalyzeMedicine().stream()
        .map(medicine -> {
          Optional<MedicineModel> medicineOpt = iMedicineRepo.findOneByItemSeq(medicine.getItemSeq());
          if (medicineOpt.isPresent()) {
            return PrescriptionMedicineBridgeModel.builder()
                .prescription(
                    finalPrescription)
                .medicine(medicineOpt.get())
                .build();
          } else {
            return null;
          }
        })
        .filter(bridgeModel -> bridgeModel != null)
        .collect(Collectors.toList());

    iPrescriptionMedicineBridgeRepo.saveAll(bridgeModels);

    for (ResultDto resultDto : resultDtos) {

      Optional<MedicineModel> targetMedicineOpt = iMedicineRepo.findOneByItemSeq(resultDto.getTarget());
      if (!targetMedicineOpt.isPresent()) {

        continue;
      }
      MedicineModel targetMedicine = targetMedicineOpt.get();

      if ("warning".equalsIgnoreCase(resultDto.getLevel()) && resultDto.getDescription() != null) {
        WarningModel warning = new WarningModel();
        warning.setPrescription(finalPrescription);
        warning.setTargetMedicine(targetMedicine);

        if ("의약품정보".equals(resultDto.getType())) {
          Optional<MedicineModel> warningMedicineOpt = iMedicineRepo.findOneByItemSeq(resultDto.getTypeTarget());
          if (warningMedicineOpt.isPresent()) {
            warning.setWarningMedicine(warningMedicineOpt.get());
            warning.setWarningMedicineDescription(resultDto.getDescription());
            iWarningRepo.save(warning);
          } else {

          }
        } else if ("신체정보".equals(resultDto.getType())) {
          warning.setWarningPatient(patientModel);
          warning.setWarningPatientDescription(resultDto.getDescription());
          iWarningRepo.save(warning);
        } else if ("질병정보".equals(resultDto.getType())) {
          Optional<DiseaseModel> warningDiseaseOpt = iDiseaseRepo.findDiseaseByName(resultDto.getTypeTarget());
          if (warningDiseaseOpt.isPresent()) {
            warning.setWarningDisease(warningDiseaseOpt.get());
            warning.setWarningDiseaseDescription(resultDto.getDescription());
            iWarningRepo.save(warning);
          } else {
          }
        }

        if (warning.getWarningMedicine() == null && warning.getWarningPatient() == null
            && warning.getWarningDisease() == null) {
        }

      } else if ("danger".equalsIgnoreCase(resultDto.getLevel()) && resultDto.getDescription() != null) {
        DangerModel danger = new DangerModel();
        danger.setPrescription(finalPrescription);
        danger.setTargetMedicine(targetMedicine);

        if ("의약품정보".equals(resultDto.getType())) {
          Optional<MedicineModel> dangerMedicineOpt = iMedicineRepo.findOneByItemSeq(resultDto.getTypeTarget());
          if (dangerMedicineOpt.isPresent()) {
            danger.setDangerMedicine(dangerMedicineOpt.get());
            danger.setDangerMedicineDescription(resultDto.getDescription());
            iDangerRepo.save(danger);
          } else {

          }
        } else if ("신체정보".equals(resultDto.getType())) {
          danger.setDangerPatient(patientModel);
          danger.setDangerPatientDescription(resultDto.getDescription());
          iDangerRepo.save(danger);
        } else if ("질병정보".equals(resultDto.getType())) {
          Optional<DiseaseModel> dangerDiseaseOpt = iDiseaseRepo.findDiseaseByName(resultDto.getTypeTarget());
          if (dangerDiseaseOpt.isPresent()) {
            danger.setDangerDisease(dangerDiseaseOpt.get());
            danger.setDangerDiseaseDescription(resultDto.getDescription());
            iDangerRepo.save(danger);
          } else {
          }
        }

        if (danger.getDangerMedicine() == null && danger.getDangerPatient() == null
            && danger.getDangerDisease() == null) {
        }

      }
    }
  }

  public static class MedicineRequest {
    private List<MedicineDto> analyzeMedicine;

    public List<MedicineDto> getAnalyzeMedicine() {
      return analyzeMedicine;
    }

    public void setAnalyzeMedicine(List<MedicineDto> analyzeMedicine) {
      this.analyzeMedicine = analyzeMedicine;
    }
  }

  @Data
  public static class ResultDto {
    private String target;
    private String type;
    private String typeTarget;
    private String description;
    private String level;
    private List<String> analyzeList;
  }
}
