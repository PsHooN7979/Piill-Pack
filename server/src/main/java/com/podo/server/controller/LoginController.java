package com.podo.server.controller;

import com.podo.server.dto.PatientDto;
import com.podo.server.dto.UserDto;
import com.podo.server.exception.BusinessLogicException;
import com.podo.server.jwt.JWTUtil;
import com.podo.server.repository.PatientRepository;
import com.podo.server.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
public class LoginController {
    private final PatientService patientService;
    private final JWTUtil jwtUtil;

    @PostMapping("/join")
    public String register(@RequestBody UserDto dto) {

        patientService.register(dto);

        return "ok";
    }



    //최초 로그인


}

