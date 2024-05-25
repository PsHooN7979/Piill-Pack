package com.demoserver.demoserver.interfaces;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demoserver.demoserver.models.DiseaseModel;

public interface IDiseaseRepo extends JpaRepository<DiseaseModel, String> {
  Optional<DiseaseModel> findDiseaseByUuid(String uuid);

  Optional<DiseaseModel> findDiseaseByName(String name);
}
