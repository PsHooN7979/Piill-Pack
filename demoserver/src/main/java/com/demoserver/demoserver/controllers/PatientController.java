package com.demoserver.demoserver.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demoserver.demoserver.dtos.DiseaseNameDto;
import com.demoserver.demoserver.dtos.FirstDto;
import com.demoserver.demoserver.dtos.PatientInfoDto;
import com.demoserver.demoserver.dtos.domainDtos.DiseaseDto;
import com.demoserver.demoserver.global.common.auth.JwtTokenProvider;
import com.demoserver.demoserver.models.PatientModel;
import com.demoserver.demoserver.services.AuthService;
import com.demoserver.demoserver.services.OpenAiService;
import com.demoserver.demoserver.services.PatientService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
@RequestMapping("/patient")
public class PatientController {

  private final JwtTokenProvider jwtTokenProvider;

  private final PatientService patientService;
  private final AuthService authService;
  private final OpenAiService openAiService;

  @GetMapping("/info")
  public PatientInfoDto allPatientInfo(@RequestHeader(value = "authorization", required = true) String accessToken) {
    Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String email = userDetails.getUsername();

    PatientModel patient = authService.findPatientByEmail(email);

    return patientService.getPatientInfo(patient.getUuid());
  }

  @PostMapping("/info/update")
  public void firstPatient(@RequestHeader(value = "authorization", required = true) String accessToken,
      @RequestBody FirstDto firstDto) {
    Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String email = userDetails.getUsername();
    PatientModel patientModel = authService.findPatientByEmail(email);

    patientService.getOrFetchDiseases(patientModel.getUuid(), firstDto);
    patientService.updatePatientInfo(patientModel.getUuid(), firstDto);
  }

}
