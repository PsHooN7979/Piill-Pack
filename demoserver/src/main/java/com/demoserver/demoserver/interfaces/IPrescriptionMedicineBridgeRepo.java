package com.demoserver.demoserver.interfaces;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demoserver.demoserver.models.bridges.PrescriptionMedicineBridgeModel;

public interface IPrescriptionMedicineBridgeRepo extends JpaRepository<PrescriptionMedicineBridgeModel, String> {
  List<PrescriptionMedicineBridgeModel> findPrescriptionMedicineBridgeByPrescriptionUuid(String uuid);
}
