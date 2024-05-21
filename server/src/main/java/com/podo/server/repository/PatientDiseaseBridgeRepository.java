package com.podo.server.repository;

import com.podo.server.entity.PatientDiseaseBridgeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PatientDiseaseBridgeRepository extends JpaRepository<PatientDiseaseBridgeEntity, UUID> {

}
