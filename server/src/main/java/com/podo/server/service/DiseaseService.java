package com.podo.server.service;


import com.podo.server.dto.DiseaseDto;
import com.podo.server.dto.PatientDiseaseDto;
import com.podo.server.entity.DiseaseEntity;
import com.podo.server.entity.PatientDiseaseBridgeEntity;
import com.podo.server.entity.PatientEntity;
import com.podo.server.repository.DiseaseRepository;
import com.podo.server.repository.PatientDiseaseBridgeRepository;
import com.podo.server.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;
    private final PatientRepository patientRepository;
    private final PatientDiseaseBridgeRepository patientDiseaseBridgeRepository;

    // 질병 추가 기능

    // 질병 조회 기능
    public List<DiseaseDto> getAllDiseases(){
        List<DiseaseEntity> diseases = diseaseRepository.findAll();
        return diseases.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private DiseaseDto convertToDto(DiseaseEntity entity){
        LocalDateTime now = LocalDateTime.now();
        return DiseaseDto.builder()
                .name(entity.getName())
                .updated(now)
                .symptoms(entity.getSymptoms())
                .created(now)
                .cause(entity.getCause())
                .prevention(entity.getPrevention())
                .build();
    }

    // 사용자 질병 등록 기능
    public PatientDiseaseDto addPatientDisease(PatientDiseaseDto dto, UUID id){
        PatientEntity patient = patientRepository.findById(dto.getPatientId()).orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
        DiseaseEntity disease = diseaseRepository.findById(dto.getDiseaseId()).orElseThrow(() -> new RuntimeException("질병 정보가 없습니다."));

        PatientDiseaseBridgeEntity patientDiseaseBridgeEntity = new PatientDiseaseBridgeEntity();
        patientDiseaseBridgeEntity.setDiseaseUuid(disease);
        patientDiseaseBridgeEntity.setPatientUuid(patient);

        PatientDiseaseBridgeEntity savedpatientDiseaseBridge = patientDiseaseBridgeRepository.save(patientDiseaseBridgeEntity);

        return toDto(savedpatientDiseaseBridge);
    }

    private PatientDiseaseDto toDto(PatientDiseaseBridgeEntity patientDiseaseBridge){
        return PatientDiseaseDto.builder()
                .patientId(patientDiseaseBridge.getDiseaseUuid().getId())
                .diseaseId(patientDiseaseBridge.getDiseaseUuid().getId())
                .build();
    }




}
