package com.demoserver.demoserver.controllers;

import com.demoserver.demoserver.dtos.ScanDto;
import com.demoserver.demoserver.dtos.domainDtos.MedicineDto;
import com.demoserver.demoserver.global.common.auth.JwtTokenProvider;
import com.demoserver.demoserver.models.PatientModel;
import com.demoserver.demoserver.services.AuthService;
import com.demoserver.demoserver.services.OpenAiService;
import com.demoserver.demoserver.services.PrescriptionService;
import com.demoserver.demoserver.services.PrescriptionService.MedicineRequest;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/prescription")
public class PrescriptionController {

  private final PrescriptionService prescriptionService;
  private final OpenAiService openAiService;
  private final AuthService authService;
  private final JwtTokenProvider jwtTokenProvider;

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
    prescriptionService.registerPrescription(patientModel, request);
    return "entity";
  }

}
