package com.demoserver.demoserver.interfaces;

import java.util.Optional;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demoserver.demoserver.models.DiseaseModel;
import com.demoserver.demoserver.models.PatientModel;
import com.demoserver.demoserver.models.bridges.PatientDiseaseBridgeModel;

public interface IPatientDiseaseBridgeRepo extends JpaRepository<PatientDiseaseBridgeModel, String> {
  Optional<PatientDiseaseBridgeModel> findPatientDiseaseBridgeByPatientUuid(String patientUuid);

  List<PatientDiseaseBridgeModel> findPatientDiseaseBridgeListByPatientUuid(String patientUuid);

  void deleteByPatient(PatientModel patient);
}
