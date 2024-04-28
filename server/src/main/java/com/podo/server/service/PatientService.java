package com.podo.server.service;

import com.podo.server.dto.PatientDto;
import com.podo.server.dto.UserDto;
import com.podo.server.entity.PatientEntity;
import com.podo.server.jwt.JWTUtil;
import com.podo.server.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    private final PasswordEncoder passwordEncoder;

    private final JWTUtil jwtUtil;


    // 회원가입 기능
    public void register(UserDto dto) {
        LocalDateTime now = LocalDateTime.now();

        Boolean isExist = patientRepository.existsByEmail(dto.getEmail());

        if (isExist) {

            return;
        }

        PatientEntity patientEntity = PatientEntity.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .created(now)
                .updated(now)
                .build();

        patientRepository.save(patientEntity);
    }

}
