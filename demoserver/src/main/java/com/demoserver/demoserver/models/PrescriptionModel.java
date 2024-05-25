package com.demoserver.demoserver.models;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.demoserver.demoserver.models.bridges.PrescriptionMedicineBridgeModel;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.*;

@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "prescription")
public class PrescriptionModel {
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String uuid;

  @Column(nullable = false, length = 255)
  private String name;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "patient_uuid", nullable = false)
  private PatientModel patient;

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime created;

  @LastModifiedDate
  @Column(nullable = false)
  private LocalDateTime updated;

  @ToString.Exclude
  @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL)
  @Builder.Default
  private List<PrescriptionMedicineBridgeModel> prescription_MedicineBridgeModels = new ArrayList<>();

  public void addPrescription_MedicineBridge(PrescriptionMedicineBridgeModel prescription_MedicineBridgeModel) {
    prescription_MedicineBridgeModels.add(prescription_MedicineBridgeModel);
  }
}
