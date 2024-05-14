package com.podo.server.service;


import com.podo.server.dto.DiseaseDto;
import com.podo.server.entity.DiseaseEntity;
import com.podo.server.repository.DiseaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;

    // 질병 추가 기능

    public DiseaseEntity saveDisease(DiseaseDto dto) {
        LocalDateTime now = LocalDateTime.now();

        DiseaseEntity diseaseEntity = DiseaseEntity.builder()
                .name(dto.getName())
                .symptoms(dto.getSymptoms())
                .prevention(dto.getPrevention())
                .cause(dto.getCause())
                .created(now)
                .updated(now)
                .build();

        return diseaseRepository.save(diseaseEntity);
    }


}
