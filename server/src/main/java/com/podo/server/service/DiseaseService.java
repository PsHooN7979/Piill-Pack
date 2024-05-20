package com.podo.server.service;


import com.podo.server.dto.DiseaseDto;
import com.podo.server.entity.DiseaseEntity;
import com.podo.server.repository.DiseaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;

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




}
