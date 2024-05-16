package com.podo.server.repository;

import com.podo.server.entity.PatientEntity;
import com.podo.server.entity.PrescriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface PrescriptionRepository extends JpaRepository<PrescriptionEntity, UUID> {

//    List<PrescriptionEntity> findByPatient_uuid_Id(UUID patient_id);

}
