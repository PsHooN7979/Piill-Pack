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

    // 처방전 정보 수정
    @Transactional
    public void modifyPresc(ModifyPresDto dto, UUID prescriptionId) {
        LocalDateTime now = LocalDateTime.now();

        // Fetch existing prescription
        Optional<PrescriptionEntity> existingPrescriptionOptional = prescriptionRepository.findById(prescriptionId);
        log.info("처음 처방전 정보: {}", existingPrescriptionOptional.get());
        if (existingPrescriptionOptional.isEmpty()) {
            throw new IllegalArgumentException("처방전 정보를 찾을 수 없습니다: " + prescriptionId);
        }

        PrescriptionEntity existingPrescription = existingPrescriptionOptional.get();
        Hibernate.initialize(existingPrescription.getPrescriptionUuid()); // Explicitly initialize the collection

        // Update prescription details
        existingPrescription.setName(dto.getName());
        existingPrescription.setUpdated(now);
        log.info("입력받은 처방전 정보: {}", existingPrescription);

        // Handle associated medicines
        List<PrescriptionMedicineBridgeEntity> prescriptionMedicines = new ArrayList<>();

        for (ModifyPresDto.MedicineDto medicineDto : dto.getMedicines()) {
            Optional<MedicineEntity> existingMedicine = medicineRepository.findByItemSeq(medicineDto.getItemSeq());

            log.info("약: {}", existingMedicine);
            MedicineEntity medicineEntity;
            if (existingMedicine.isPresent()) {
                medicineEntity = existingMedicine.get();
                log.info("Existing medicine found: {}", medicineEntity.getItemSeq());
            } else {
                log.info("Creating new medicine: {}", medicineDto.getItemSeq());
                medicineEntity = MedicineEntity.builder()
                        .ediCode(medicineDto.getEdiCode())
                        .name(medicineDto.getName())
                        .chart(medicineDto.getChart())
                        .className(medicineDto.getClassName())
                        .itemSeq(medicineDto.getItemSeq())
                        .created(now)
                        .updated(now)
                        .build();

                medicineEntity = medicineRepository.save(medicineEntity);
                Optional<MedicineEntity> medicineOptional = medicineRepository.findByItemSeq(medicineDto.getItemSeq());
                MedicineEntity medicineEntity1 = medicineOptional.get();
                log.info("New medicine saved: {}", medicineEntity.getItemSeq());
            }

            // Ensure medicineEntity has a UUID
            if (medicineEntity.getId() == null) {
                log.error("Medicine entity ID is null after save: {}", medicineEntity);
                throw new IllegalStateException("Medicine entity ID is null");
            }
            log.info("New medicine saved: {}", medicineEntity);

            PrescriptionMedicineBridgeEntity prescriptionMedicine = PrescriptionMedicineBridgeEntity.builder()
                    .prescriptionUuid(existingPrescription)
                    .medicineUuid(medicineEntity)
                    .build();


            prescriptionMedicines.add(prescriptionMedicine);
        }

        // Update existing prescription's medicines
        existingPrescription.setPrescriptionUuid(prescriptionMedicines);

        // Save the updated prescription
        prescriptionRepository.save(existingPrescription);

        // Save the updated prescription-medicine bridges
        prescriptionMedicineBridgeRepository.saveAll(prescriptionMedicines);
    }

    // 처방전 삭제 로직
    @Transactional
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
}
