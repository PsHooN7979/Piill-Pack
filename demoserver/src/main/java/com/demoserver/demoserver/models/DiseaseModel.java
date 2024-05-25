package com.demoserver.demoserver.models;

import java.time.LocalDateTime;
import java.util.*;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.demoserver.demoserver.models.bridges.PatientDiseaseBridgeModel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "disease")
public class DiseaseModel {
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String uuid;

  @Column(nullable = false, length = 255)
  private String name;

  // 증상
  @Column(nullable = false, length = 255)
  private String symptom;

  // 주의사항
  @Column(nullable = false, length = 255)
  private String precaution;

  // 예방
  @Column(nullable = false, length = 255)
  private String prevention;

  // 치료법
  @Column(nullable = false, length = 255)
  private String treatment;

  // 질병 유효 여부
  @Column(name = "is_valid", nullable = false)
  private Boolean isValid;

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime created;

  @LastModifiedDate
  @Column(nullable = false)
  private LocalDateTime updated;

  @ToString.Exclude
  @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL)
  @Builder.Default
  private List<PatientDiseaseBridgeModel> patient_DiseaseBridgeModels = new ArrayList<>();

  public void addPatient_DiseasesBridge(PatientDiseaseBridgeModel patient_DiseaseBridgeModel) {
    patient_DiseaseBridgeModels.add(patient_DiseaseBridgeModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "warningDisease", cascade = CascadeType.ALL)
  @Builder.Default
  private List<WarningModel> warningModels = new ArrayList<>();

  public void addWarning(WarningModel warningModel) {
    warningModels.add(warningModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "dangerDisease", cascade = CascadeType.ALL)
  @Builder.Default
  private List<DangerModel> dangerModels = new ArrayList<>();

  public void addDanger(DangerModel dangerModel) {
    dangerModels.add(dangerModel);
  }
}
