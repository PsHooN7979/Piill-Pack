package com.demoserver.demoserver.controllers;

import com.demoserver.demoserver.dtos.PatientInfoDto;
import com.demoserver.demoserver.dtos.PatientInfoWithMedicineDto;
import com.demoserver.demoserver.dtos.ScanDto;
import com.demoserver.demoserver.dtos.domainDtos.MedicineDto;
import com.demoserver.demoserver.global.common.auth.JwtTokenProvider;
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
import com.demoserver.demoserver.services.AuthService;
import com.demoserver.demoserver.services.OpenAiService;
import com.demoserver.demoserver.services.PatientService;
import com.demoserver.demoserver.services.PrescriptionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/prescription")
public class PrescriptionController {

  private final PrescriptionService prescriptionService;
  private final OpenAiService openAiService;
  private final AuthService authService;
  private final JwtTokenProvider jwtTokenProvider;
  private final IPrescriptionRepo iPrescriptionRepo;
  private final IMedicineRepo iMedicineRepo;
  private final IPrescriptionMedicineBridgeRepo iPrescriptionMedicineBridgeRepo;
  private final PatientService patientService;
  private final IDiseaseRepo iDiseaseRepo;
  private final IWarningRepo iWarningRepo;
  private final IDangerRepo iDangerRepo;

  @PostMapping("/scan")
  public ResponseEntity<List<MedicineDto>> scanPrescription(@RequestBody ScanDto scanDto) {
    try {
      String result = prescriptionService.processBase64Image(scanDto.getBase64ImageToString());
      List<String> numbers = prescriptionService.extractNineDigitNumbers(result);
      List<JsonNode> medicineInfos = prescriptionService.getMedicineInfo(numbers);

      List<MedicineDto> analyzeMedicine = openAiService.analyzeMedicineByOpenAi(medicineInfos);

      return ResponseEntity.ok(analyzeMedicine);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @PostMapping("/register")
  public String registerPrescription(@RequestHeader(value = "authorization", required = true) String accessToken,
      @RequestBody MedicineRequest request) {

    Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String email = userDetails.getUsername();
    PatientModel patientModel = authService.findPatientByEmail(email);

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

    log.info("resultDto: {}", resultDtos.toString());
    for (ResultDto resultDto : resultDtos) {

      Optional<MedicineModel> targetMedicineOpt = iMedicineRepo.findOneByItemSeq(resultDto.getTarget());
      if (!targetMedicineOpt.isPresent()) {
        log.warn("Target medicine not found for itemSeq: {}", resultDto.getTarget());
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
            log.warn("Warning medicine not found for itemSeq: {}", resultDto.getTypeTarget());
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
            log.warn("Danger medicine not found for itemSeq: {}", resultDto.getTypeTarget());
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

    return "entity";
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
    private List<String> analyzeList; // analyzeList 필드 추가
  }

}
