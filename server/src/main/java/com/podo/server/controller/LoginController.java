package com.podo.server.controller;

import com.podo.server.dto.UserDto;
import com.podo.server.repository.PatientRepository;
import com.podo.server.service.PatientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class LoginController {
    private final PatientService patientService;
    @PostMapping("/join")
    public String register(@RequestBody UserDto dto){

        patientService.register(dto);

        return "ok";
    }

}
