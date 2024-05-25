package com.demoserver.demoserver.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demoserver.demoserver.dtos.AuthDto;
import com.demoserver.demoserver.dtos.TokenDto;
import com.demoserver.demoserver.global.common.status.InternalServerException;
import com.demoserver.demoserver.models.PatientModel;
import com.demoserver.demoserver.services.AuthService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody AuthDto authDto) {
    try {
      authService.isEmailAlreadyRegistered(authDto.getEmail());
      UUID token = UUID.randomUUID();
      String encode = authService.encodedPassword(authDto.getPassword());
      authService.createPatient(token, encode, authDto.getEmail());
      authService.sendEmailVerification(authDto.getEmail(), token);

      return ResponseEntity.ok(authDto.getEmail());
    } catch (Exception error) {
      throw new InternalServerException(error.toString());
    }
  }

  @GetMapping("/register/verification")
  public String verificationUser(@RequestParam(name = "token", required = true) String token) {
    PatientModel patient = authService.findPatientByToken(token);
    boolean isValid = authService.verificationComplete(patient);
    if (isValid) {
      // initService.pillpackInit(patient);
    }

    String content = authService.loadCompleteVerificationHtml();

    return content;
  }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody AuthDto authDto) {
    String email = authDto.getEmail();
    String password = authDto.getPassword();

    PatientModel patient = authService.findPatientByEmail(email);
    authService.verifyPassword(password, patient);

    authService.isEmailValid(patient);

    TokenDto tokenDto = authService.login(email, password);
    String accessToken = tokenDto.getAccessToken();
    String refreshToken = tokenDto.getRefreshToken();

    HttpHeaders headers = new HttpHeaders();
    headers.add("Access-Token", accessToken);
    headers.add("Refresh-Token", refreshToken);

    String loginResult = "default";
    if (authService.checkIsFirst(patient)) {
      loginResult = "First Login";
    } else {
      loginResult = "Success Login";
    }

    return ResponseEntity.ok().headers(headers).body(loginResult);
  }
}
