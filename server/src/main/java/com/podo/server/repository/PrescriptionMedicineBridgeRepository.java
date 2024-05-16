package com.podo.server.repository;

import com.podo.server.entity.PrescriptionMedicineBridgeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PrescriptionMedicineBridgeRepository extends JpaRepository<PrescriptionMedicineBridgeEntity, UUID> {
}
