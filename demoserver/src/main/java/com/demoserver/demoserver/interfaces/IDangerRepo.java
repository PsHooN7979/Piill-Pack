package com.demoserver.demoserver.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demoserver.demoserver.models.DangerModel;

import java.util.*;

public interface IDangerRepo extends JpaRepository<DangerModel, String> {
  List<DangerModel> findDangerByPrescriptionUuid(String uuid);
}
