package com.demoserver.demoserver.interfaces;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demoserver.demoserver.models.PrescriptionModel;

public interface IPrescriptionRepo extends JpaRepository<PrescriptionModel, String> {
  List<PrescriptionModel> findPrescriptionByPatientUuid(String uuid);
}
