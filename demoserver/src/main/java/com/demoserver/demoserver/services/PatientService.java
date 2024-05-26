package com.demoserver.demoserver.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.demoserver.demoserver.dtos.*;
import com.demoserver.demoserver.dtos.domainDtos.*;
import com.demoserver.demoserver.interfaces.*;
import com.demoserver.demoserver.models.*;
import com.demoserver.demoserver.models.bridges.*;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

        private final IPatientRepo iPatientRepo;
        private final IDiseaseRepo iDiseaseRepo;
        private final IPrescriptionRepo iPrescriptionRepo;
        private final IPatientDiseaseBridgeRepo iPatientDiseaseBridgeRepo;
        private final IPrescriptionMedicineBridgeRepo iPrescriptionMedicineBridgeRepo;
        private final IWarningRepo iWarningRepo;
        private final IDangerRepo iDangerRepo;

        private final OpenAiService openAiService;

        public PatientInfoDto getPatientInfo(String patientUuid) {

                PatientModel patient = iPatientRepo.findPatientByUuid(patientUuid.toString())
                                .orElseThrow(() -> new IllegalArgumentException("Invalid patient UUID"));

                List<DiseaseModel> diseases = iPatientDiseaseBridgeRepo
                                .findPatientDiseaseBridgeListByPatientUuid(patient.getUuid()).stream()
                                .map(PatientDiseaseBridgeModel::getDisease)
                                .map(disease -> iDiseaseRepo.findDiseaseByUuid(disease.getUuid())
                                                .orElseThrow(() -> new IllegalArgumentException(
                                                                "Disease not found: " + disease.getUuid())))
                                .collect(Collectors.toList());

                List<PrescriptionModel> prescriptions = iPrescriptionRepo
                                .findPrescriptionByPatientUuid(patient.getUuid());

                List<DiseaseDto> diseaseList = diseases.stream()
                                .map(disease -> new DiseaseDto(disease.getName(), disease.getSymptom(),
                                                disease.getPrecaution(), disease.getPrevention(),
                                                disease.getTreatment(), disease.getIsValid()))
                                .collect(Collectors.toList());

                List<PrescriptionDto> prescriptionList = prescriptions.stream()
                                .map(prescription -> {
                                        List<MedicineDto> medicineList = iPrescriptionMedicineBridgeRepo
                                                        .findPrescriptionMedicineBridgeByPrescriptionUuid(
                                                                        prescription.getUuid())
                                                        .stream()
                                                        .map(bridge -> {
                                                                MedicineModel medicine = bridge.getMedicine();
                                                                return new MedicineDto(medicine.getItemSeq(),
                                                                                medicine.getEntpSeq(),
                                                                                medicine.getItemName(),
                                                                                medicine.getEntpName(),
                                                                                medicine.getChart(),
                                                                                medicine.getItemImage(),
                                                                                medicine.getClassName(),
                                                                                medicine.getEtcOtcName(),
                                                                                medicine.getEfficacy(),
                                                                                medicine.getEffect(),
                                                                                medicine.getManufacturer(),
                                                                                medicine.getStorageMethod(),
                                                                                medicine.getSideEffect(),
                                                                                medicine.getIntakeMethod(),
                                                                                medicine.getIngredient(),
                                                                                medicine.getPrecautions());
                                                        }).collect(Collectors.toList());

                                        List<WarningDto> warningList = iWarningRepo
                                                        .findWarningByPrescriptionUuid(prescription.getUuid())
                                                        .stream()
                                                        .map(warning -> new WarningDto(warning.getUuid(),
                                                                        warning.getTargetMedicine() != null
                                                                                        ? warning.getTargetMedicine()
                                                                                                        .getUuid()
                                                                                        : null,
                                                                        warning.getWarningMedicine() != null
                                                                                        ? warning.getWarningMedicine()
                                                                                                        .getUuid()
                                                                                        : null,
                                                                        warning.getWarningPatient() != null
                                                                                        ? warning.getWarningPatient()
                                                                                                        .getUuid()
                                                                                        : null,
                                                                        warning.getWarningDisease() != null
                                                                                        ? warning.getWarningDisease()
                                                                                                        .getUuid()
                                                                                        : null,
                                                                        warning.getWarningMedicineDescription(),
                                                                        warning.getWarningPatientDescription(),
                                                                        warning.getWarningDiseaseDescription()))
                                                        .collect(Collectors.toList());

                                        List<DangerDto> dangerList = iDangerRepo
                                                        .findDangerByPrescriptionUuid(prescription.getUuid())
                                                        .stream()
                                                        .map(danger -> new DangerDto(danger.getUuid(),
                                                                        danger.getTargetMedicine() != null
                                                                                        ? danger.getTargetMedicine()
                                                                                                        .getUuid()
                                                                                        : null,
                                                                        danger.getDangerMedicine() != null
                                                                                        ? danger.getDangerMedicine()
                                                                                                        .getUuid()
                                                                                        : null,
                                                                        danger.getDangerPatient() != null
                                                                                        ? danger.getDangerPatient()
                                                                                                        .getUuid()
                                                                                        : null,
                                                                        danger.getDangerDisease() != null
                                                                                        ? danger.getDangerDisease()
                                                                                                        .getUuid()
                                                                                        : null,
                                                                        danger.getDangerMedicineDescription(),
                                                                        danger.getDangerPatientDescription(),
                                                                        danger.getDangerDiseaseDescription()))
                                                        .collect(Collectors.toList());

                                        return new PrescriptionDto(prescription.getName(), medicineList, warningList,
                                                        dangerList);
                                }).collect(Collectors.toList());

                PatientDto patientDto = new PatientDto(patient.getProfileImageUrl(), patient.getEmail(),
                                patient.getNick(), patient.getAge(),
                                patient.getHeight(), patient.getWeight(), patient.getGender());

                return new PatientInfoDto(patientDto, diseaseList, prescriptionList);
        }

        @Transactional
        public void getOrFetchDiseases(String patientUuid, FirstDto firstDto) {
                PatientModel patient = iPatientRepo.findPatientByUuid(patientUuid)
                                .orElseThrow(() -> new IllegalArgumentException("Invalid user UUID"));

                List<String> diseaseNames = firstDto.getDiseaseList();
                List<DiseaseDto> diseaseDtos = new ArrayList<>();

                iPatientDiseaseBridgeRepo.deleteByPatient(patient);
                for (String diseaseName : diseaseNames) {
                        Optional<DiseaseModel> optionalDisease = iDiseaseRepo.findDiseaseByName(diseaseName);
                        if (optionalDisease.isPresent()) {
                                DiseaseModel disease = optionalDisease.get();
                                PatientDiseaseBridgeModel patientDiseaseBridgeModel = new PatientDiseaseBridgeModel();
                                patientDiseaseBridgeModel.setDisease(disease);
                                patientDiseaseBridgeModel.setPatient(patient);
                                iPatientDiseaseBridgeRepo.save(patientDiseaseBridgeModel);

                        } else {
                                diseaseDtos.add(new DiseaseDto(diseaseName, "", "", "", "", true)); // 기본 값을 가진

                        }
                }

                if (!diseaseDtos.isEmpty()) {
                        String question = openAiService.generateQuestionFromDiseaseNames(
                                        diseaseDtos.stream().map(DiseaseDto::getName).collect(Collectors.toList()));
                        List<DiseaseDto> fetchedDiseaseDtos = openAiService.analyzeDiseaseByOpenAi(question);
                        diseaseDtos.clear();
                        diseaseDtos.addAll(fetchedDiseaseDtos);

                        for (DiseaseDto fetchedDisease : fetchedDiseaseDtos) {
                                if (!fetchedDisease.getSymptom().isEmpty() || !fetchedDisease.getPrecautions().isEmpty()
                                                ||
                                                !fetchedDisease.getPrevention().isEmpty()
                                                || !fetchedDisease.getTreatment().isEmpty()
                                                || fetchedDisease.getSymptom() != "") {
                                        DiseaseModel diseaseModel = new DiseaseModel();
                                        diseaseModel.setName(fetchedDisease.getName());
                                        diseaseModel.setSymptom(fetchedDisease.getSymptom());
                                        diseaseModel.setPrecaution(fetchedDisease.getPrecautions());
                                        diseaseModel.setPrevention(fetchedDisease.getPrevention());
                                        diseaseModel.setTreatment(fetchedDisease.getTreatment());
                                        diseaseModel.setIsValid(fetchedDisease.getIsValid());
                                        iDiseaseRepo.save(diseaseModel);
                                }
                        }
                }

                for (DiseaseDto diseaseDto : diseaseDtos) {
                        DiseaseModel disease = iDiseaseRepo.findDiseaseByName(diseaseDto.getName())
                                        .orElseGet(() -> iDiseaseRepo.save(new DiseaseModel(null,
                                                        diseaseDto.getName(), diseaseDto.getSymptom(),
                                                        diseaseDto.getPrecautions(),
                                                        diseaseDto.getPrevention(), diseaseDto.getTreatment(),
                                                        diseaseDto.getIsValid(), null, null,
                                                        new ArrayList<>(), new ArrayList<>(), new ArrayList<>())));

                        PatientDiseaseBridgeModel bridgeModel = new PatientDiseaseBridgeModel();
                        bridgeModel.setPatient(patient);
                        bridgeModel.setDisease(disease);
                        iPatientDiseaseBridgeRepo.save(bridgeModel);
                }
        }

        @Transactional
        public void updatePatientInfo(String userUuid, FirstDto firstDto) {
                PatientModel patient = iPatientRepo.findPatientByUuid(userUuid)
                                .orElseThrow(() -> new IllegalArgumentException("Invalid user UUID"));

                patient.setProfileImageUrl(firstDto.getImage());
                patient.setNick(firstDto.getNick());
                patient.setAge(firstDto.getAge());
                patient.setHeight(firstDto.getHeight());
                patient.setWeight(firstDto.getWeight());
                patient.setGender(firstDto.getGender());
                patient.setIsFirst(false);

                iPatientRepo.save(patient);
        }
}
