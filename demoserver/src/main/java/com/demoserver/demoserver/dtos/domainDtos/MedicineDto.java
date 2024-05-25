package com.demoserver.demoserver.dtos.domainDtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MedicineDto {
  private String itemSeq;
  private String entpSeq;
  private String itemName;
  private String entpName;
  private String chart;
  private String itemImage;
  private String className;
  private String etcOtcName;
  private String efficacy;
  private String effect;
  private String manufacturer;
  private String storageMethod;
  private String sideEffect;
  private String intakeMethod;
  private String ingredient;
  private String precautions;
}
