package com.demoserver.demoserver.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.demoserver.demoserver.models.bridges.PrescriptionMedicineBridgeModel;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

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
@Table(name = "medicine")
public class MedicineModel {
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String uuid;

  @Column(name = "item_seq", length = 255, nullable = false)
  private String itemSeq;

  @Column(name = "entp_seq", length = 255, nullable = false)
  private String entpSeq;

  @Column(name = "item_name", length = 255, nullable = false)
  private String itemName;

  @Column(name = "entp_name", length = 255, nullable = false)
  private String entpName;

  @Column(length = 255, nullable = false)
  private String chart;

  @Column(name = "item_image", length = 255, nullable = false)
  private String itemImage;

  @Column(name = "class_name", length = 255, nullable = false)
  private String className;

  @Column(name = "etc_otc_name", length = 255, nullable = false)
  private String etcOtcName;

  @Column(length = 255, nullable = false)
  private String efficacy;

  @Column(length = 255, nullable = false)
  private String effect;

  @Column(length = 255, nullable = false)
  private String manufacturer;

  @Column(name = "storage_method", length = 255, nullable = false)
  private String storageMethod;

  @Column(name = "side_effect", length = 255, nullable = false)
  private String sideEffect;

  @Column(name = "intake_method", length = 255, nullable = false)
  private String intakeMethod;

  @Column(length = 255, nullable = false)
  private String ingredient;

  @Column(length = 255, nullable = false)
  private String precautions;

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime created;

  @LastModifiedDate
  @Column(nullable = false)
  private LocalDateTime updated;

  @ToString.Exclude
  @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL)
  @Builder.Default
  private List<PrescriptionMedicineBridgeModel> prescriptionMedicineBridgeModels = new ArrayList<>();

  public void addPrescriptionMedicineBridge(PrescriptionMedicineBridgeModel prescriptionMedicineBridgeModel) {
    prescriptionMedicineBridgeModels.add(prescriptionMedicineBridgeModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "targetMedicine", cascade = CascadeType.ALL)
  @Builder.Default
  private List<WarningModel> targetWarningModels = new ArrayList<>();

  public void addTargetWarning(WarningModel targetWarningModel) {
    targetWarningModels.add(targetWarningModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "warningMedicine", cascade = CascadeType.ALL)
  @Builder.Default
  private List<WarningModel> warningModels = new ArrayList<>();

  public void addWarning(WarningModel warningModel) {
    warningModels.add(warningModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "targetMedicine", cascade = CascadeType.ALL)
  @Builder.Default
  private List<DangerModel> targetDangerModels = new ArrayList<>();

  public void addTargetDanger(DangerModel targetDangerModel) {
    targetDangerModels.add(targetDangerModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "dangerMedicine", cascade = CascadeType.ALL)
  @Builder.Default
  private List<DangerModel> dangerModels = new ArrayList<>();

  public void addDanger(DangerModel dangerModel) {
    dangerModels.add(dangerModel);
  }
}
