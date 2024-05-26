package com.demoserver.demoserver.dtos.domainDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DangerDto {
  private String uuid;
  private String targetMedicineUuid;
  private String targetMedicineName;
  private String dangerMedicineUuid;
  private String dangerMedicineName;
  private String dangerPatientUuid;
  private String dangerDiseaseUuid;
  private String dangerMedicineDescription;
  private String dangerPatientDescription;
  private String dangerDiseaseDescription;
}
