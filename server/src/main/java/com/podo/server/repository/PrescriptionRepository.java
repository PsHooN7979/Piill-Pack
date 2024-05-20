package com.podo.server.repository;

import com.podo.server.dto.PrescriptionDto;
import com.podo.server.entity.PatientEntity;
import com.podo.server.entity.PrescriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;


public interface PrescriptionRepository extends JpaRepository<PrescriptionEntity, UUID> {

    List<PrescriptionEntity> findByPatientUuid(PatientEntity patient);

}
