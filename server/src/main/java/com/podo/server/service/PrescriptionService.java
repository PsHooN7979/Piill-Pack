package com.podo.server.service;

import com.podo.server.dto.PrescriptionDto;
import com.podo.server.entity.PatientEntity;
import com.podo.server.entity.PrescriptionEntity;
import com.podo.server.repository.PatientRepository;
import com.podo.server.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    public PrescriptionEntity addPresc(PrescriptionDto dto, UUID patientId) {
        LocalDateTime now = LocalDateTime.now();

        Optional<PatientEntity> patientEntityOptional = patientRepository.findById(patientId);
        if (patientEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("환자 아이디를 찾을 수 없습니다: " + patientId);
        }

        PatientEntity patient = patientEntityOptional.get();

        PrescriptionEntity entity = PrescriptionEntity.builder()
                .name(dto.getName())
                .created(now)
                .updated(now)
                .patient_uuid(patient)
                .build();

        return prescriptionRepository.save(entity);
    }
}
