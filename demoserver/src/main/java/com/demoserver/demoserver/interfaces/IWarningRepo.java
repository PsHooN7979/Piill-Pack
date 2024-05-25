package com.demoserver.demoserver.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demoserver.demoserver.models.WarningModel;

import java.util.*;

public interface IWarningRepo extends JpaRepository<WarningModel, String> {
  List<WarningModel> findWarningByPrescriptionUuid(String uuid);
}
