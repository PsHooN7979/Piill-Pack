package com.podo.server.service;

import com.podo.server.dto.PatientDto;
import com.podo.server.dto.UserDto;
import com.podo.server.entity.PatientEntity;
import com.podo.server.exception.BusinessLogicException;
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

            throw new BusinessLogicException("User with email " + dto.getEmail() + " already exists.");  // Raise an exception
        }


        PatientEntity patientEntity = PatientEntity.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .created(now)
                .updated(now)
                .build();

        patientRepository.save(patientEntity);
    }

    public void registerInfo(PatientDto dto, String email) {
        PatientEntity patient = patientRepository.findByEmail(email);  // Retrieve the patient by email

        if (patient == null) {
            // Create a new patient if not found
            patient = PatientEntity.builder()
                    .email(email)
                    .password(passwordEncoder.encode(dto.getPassword()))  // If the password is present in the dto
                    .created(LocalDateTime.now())
                    .build();
        }

        // Update existing fields
        patient.setAge(dto.getAge());
        patient.setGender(dto.getGender());
        patient.setWeight(dto.getWeight());
        patient.setHeight(dto.getHeight());
        patient.setNickname(dto.getNickname());
        patient.setIs_fist(false);
        patient.setUpdated(LocalDateTime.now());

        // Save back to the database
        patientRepository.save(patient);
    }

}
