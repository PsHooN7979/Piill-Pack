package com.demoserver.demoserver.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "danger")
public class DangerModel {
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String uuid;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "prescription_uuid", nullable = false)
  private PrescriptionModel prescription;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "target_medicine_uuid", nullable = false)
  private MedicineModel targetMedicine;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "danger_medicine_uuid", nullable = true)
  private MedicineModel dangerMedicine;

  @Column(name = "danger_medicine_description", nullable = true, length = 255)
  private String dangerMedicineDescription;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "danger_patient_uuid", nullable = true)
  private PatientModel dangerPatient;

  @Column(name = "danger_patient_description", nullable = true, length = 255)
  private String dangerPatientDescription;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "danger_disease_uuid", nullable = true)
  private DiseaseModel dangerDisease;

  @Column(name = "danger_disease_description", nullable = true, length = 255)
  private String dangerDiseaseDescription;

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime created;

  @LastModifiedDate
  @Column(nullable = false)
  private LocalDateTime updated;
}
