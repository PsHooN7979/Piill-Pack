package com.podo.server.service;

import com.podo.server.dto.PatientDto;
import com.podo.server.dto.UserDto;
import com.podo.server.entity.DiseaseEntity;
import com.podo.server.entity.PatientEntity;
import com.podo.server.exception.BusinessLogicException;
import com.podo.server.jwt.JWTUtil;
import com.podo.server.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
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

    //최초 로그인 -> 회원정보 입력
    public void registerInfo(PatientDto dto, String email) {
        PatientEntity patient = patientRepository.findByEmail(email);  // 유저 이메일을 이용해 유저 정보 가져옴

        // 유저 정보 수정
        patient.setAge(dto.getAge());
        patient.setGender(dto.getGender());
        patient.setWeight(dto.getWeight());
        patient.setHeight(dto.getHeight());
        patient.setNickname(dto.getNickname());
        patient.setIsFist(false);
        patient.setUpdated(LocalDateTime.now());

        // db에 저장
        patientRepository.save(patient);
    }


    public void setPatientInfo( String email, String nickname, Integer age, Integer weight, Integer height, boolean gender) {

        PatientEntity patient = patientRepository.findByEmail(email);

        patient.setNickname(nickname);
        patient.setAge(age);
        patient.setWeight(weight);
        patient.setHeight(height);
        patient.setGender(gender);
        patient.setIsFist(false);

        patientRepository.save(patient);
    }


    public Optional<PatientEntity> patientId(UUID id) {
        return patientRepository.findById(id);
    }

    // 회원정보 조회
    public PatientDto getPatientInfo(PatientEntity entity) {
        return PatientDto.builder()
                .age(entity.getAge())
                .gender(entity.getGender())
                .nickname(entity.getNickname())
                .height(entity.getHeight())
                .weight(entity.getWeight())
                .is_first(entity.getIsFist())
                .updated(entity.getUpdated())
                .build();


    }

    // 회원 탈퇴
//    @Transactional(readOnly = true)
//    public void deletePatient(UUID id){
//        try{
//            Optional<PatientEntity> patientOptional = patientRepository.findById(id);
//
//            if(patientOptional.isEmpty()) {
//                log.error("환자 정보 없음: {}", id);
//                throw new IllegalArgumentException("환자 정보를 찾을 수 없습니다: " + id);
//            }
//
//            PatientEntity patientEntity = patientOptional.get();
//
//        }
//    }



}
