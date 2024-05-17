package com.podo.server.service;

import com.podo.server.dto.PrescriptionDto;
import com.podo.server.entity.MedicineEntity;
import com.podo.server.entity.PatientEntity;
import com.podo.server.entity.PrescriptionEntity;
import com.podo.server.entity.PrescriptionMedicineBridgeEntity;
import com.podo.server.repository.MedicineRepository;
import com.podo.server.repository.PatientRepository;
import com.podo.server.repository.PrescriptionMedicineBridgeRepository;
import com.podo.server.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final MedicineRepository medicineRepository;
    private final PrescriptionMedicineBridgeRepository prescriptionMedicineBridgeRepository;


    public PrescriptionEntity addPresc(PrescriptionDto dto, UUID patientId) {
        LocalDateTime now = LocalDateTime.now();

        Optional<PatientEntity> patientEntityOptional = patientRepository.findById(patientId);
        if (patientEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("환자 정보를 찾을 수 없습니다: " + patientId);
        }

        PatientEntity patient = patientEntityOptional.get();

        PrescriptionEntity prescriptionEntity = PrescriptionEntity.builder()
                .name(dto.getName())
                .created(now)
                .updated(now)
                .patientUuid(patient)
                .build();


        List<PrescriptionMedicineBridgeEntity> prescriptionMedicines = new ArrayList<>();

        for (PrescriptionDto.MedicineDto medicineDto : dto.getMedicines()) {
            Optional<MedicineEntity> existingMedicine = medicineRepository.findByEdiCode(medicineDto.getEdiCode());


            MedicineEntity medicineEntity;
            if (existingMedicine.isPresent()) {
                medicineEntity = existingMedicine.get();
            } else {

                medicineEntity = MedicineEntity.builder()
                        .ediCode(medicineDto.getEdiCode())
                        .name(medicineDto.getName())
                        .chart(medicineDto.getChart())
                        .className(medicineDto.getClass_name())
                        .created(now)
                        .updated(now)
                        .build();

                medicineEntity = medicineRepository.save(medicineEntity);
            }


            PrescriptionMedicineBridgeEntity prescriptionMedicine = PrescriptionMedicineBridgeEntity.builder()
                    .prescriptionUuid(prescriptionEntity)
                    .medicineUuid(medicineEntity)
                    .build();

            prescriptionMedicines.add(prescriptionMedicine);
        }

        prescriptionEntity.setPrescriptionUuid(prescriptionMedicines);
        PrescriptionEntity addPresc = prescriptionRepository.save(prescriptionEntity);


        prescriptionMedicineBridgeRepository.saveAll(prescriptionMedicines);

        return addPresc;


    }
}
