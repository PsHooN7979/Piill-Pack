package com.podo.server.service;

import com.podo.server.dto.ModifyPresDto;
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
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final MedicineRepository medicineRepository;
    private final PrescriptionMedicineBridgeRepository prescriptionMedicineBridgeRepository;


    // 처방전 추가
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
        // 약 정보도 추가함
        for (PrescriptionDto.MedicineDto medicineDto : dto.getMedicines()) {
            Optional<MedicineEntity> existingMedicine = medicineRepository.findByItemSeq(medicineDto.getItemSeq());


            MedicineEntity medicineEntity;
            if (existingMedicine.isPresent()) {
                medicineEntity = existingMedicine.get();
            } else {

                medicineEntity = MedicineEntity.builder()
                        .ediCode(medicineDto.getEdiCode())
                        .itemSeq(medicineDto.getItemSeq())
                        .name(medicineDto.getName())
                        .chart(medicineDto.getChart())
                        .className(medicineDto.getClassName())
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


    // 처방전 삭제 로직

    @Transactional(readOnly = true)
    public void deletePresc(UUID id) {
        try {
            Optional<PrescriptionEntity> existingPrescriptionOptional = prescriptionRepository.findById(id);
            if (existingPrescriptionOptional.isEmpty()) {
                log.error("Prescription not found with id: {}", id);
                throw new IllegalArgumentException("처방전 정보를 찾을 수 없습니다: " + id);
            }
            PrescriptionEntity existingPrescription = existingPrescriptionOptional.get();

            List<PrescriptionMedicineBridgeEntity> bridges = prescriptionMedicineBridgeRepository.findByPrescriptionUuid(existingPrescription);
            if (bridges != null) {
                log.info("Deleting {} bridge(s) for prescription id: {}", bridges.size(), id);
                prescriptionMedicineBridgeRepository.deleteAll(bridges);
            } else {
                log.warn("No bridges found for prescription id: {}", id);
            }

            // Delete the prescription
            log.info("Deleting prescription id: {}", id);
            prescriptionRepository.delete(existingPrescription);
            log.info("Successfully deleted prescription id: {}", id);
        } catch (Exception e) {
            log.error("Error deleting prescription id: {}", id, e);
            throw e;
        }
    }

    // 처방전 조회
    @Transactional(readOnly = true)
    public List<PrescriptionDto> getPresc(UUID patientId){
        Optional<PatientEntity> patientEntityOptional = patientRepository.findById(patientId);

        if (patientEntityOptional.isEmpty()){
            throw new IllegalArgumentException("환자 정보를 찾을 수 없습니다 : " + patientId);
        }
        PatientEntity patient = patientEntityOptional.get();
        System.out.println("환자 정보" +patient);
        List<PrescriptionEntity> prescriptions = prescriptionRepository.findByPatientUuid(patient);
        return prescriptions.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private PrescriptionDto convertToDto(PrescriptionEntity entity) {
        return PrescriptionDto.builder()
                .name(entity.getName())
                .created(entity.getCreated())
                .updated(entity.getUpdated())
                .medicines(entity.getPrescriptionUuid().stream().map(bridge ->
                                PrescriptionDto.MedicineDto.builder()
                                        .ediCode(bridge.getMedicineUuid().getEdiCode())
                                        .name(bridge.getMedicineUuid().getName())
                                        .chart(bridge.getMedicineUuid().getChart())
                                        .className(bridge.getMedicineUuid().getClassName())
                                        .itemSeq(bridge.getMedicineUuid().getItemSeq())
                                        .build())
                        .collect(Collectors.toList()))
                .build();
    }
}


