package com.demoserver.demoserver.interfaces;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.demoserver.demoserver.models.PatientModel;

public interface IPatientRepo extends JpaRepository<PatientModel, String> {
  Optional<PatientModel> findPatientByEmail(String email);

  Optional<PatientModel> findPatientByToken(String token);

  Optional<PatientModel> findPatientByUuid(String uuid);
}
