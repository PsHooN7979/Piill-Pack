package com.podo.server.repository;

import com.podo.server.entity.DiseaseNameList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DiseaseNameRepository extends JpaRepository<DiseaseNameList, UUID> {



}
