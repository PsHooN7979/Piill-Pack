package com.podo.server.repository;

import com.podo.server.entity.MedicineEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MedicineRepository extends JpaRepository<MedicineEntity, UUID> {
}
