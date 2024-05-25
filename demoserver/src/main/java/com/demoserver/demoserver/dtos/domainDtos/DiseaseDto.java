package com.demoserver.demoserver.dtos.domainDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DiseaseDto {
  private String name;
  private String symptom;
  private String precautions;
  private String prevention;
  private String treatment;
  private Boolean isValid;
}
