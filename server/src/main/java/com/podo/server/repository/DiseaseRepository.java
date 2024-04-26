package com.podo.server.repository;

import com.podo.server.entity.DiseaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DiseaseRepository extends JpaRepository<DiseaseEntity, UUID> {
}
