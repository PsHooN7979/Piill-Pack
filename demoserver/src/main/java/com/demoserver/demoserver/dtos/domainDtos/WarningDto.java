package com.demoserver.demoserver.dtos.domainDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WarningDto {
  private String uuid;
  private String targetMedicineUuid;
  private String targeMedicineName;
  private String warningMedicineUuid;
  private String warningMedicineName;
  private String warningPatientUuid;
  private String warningDiseaseUuid;
  private String warningMedicineDescription;
  private String warningPatientDescription;
  private String warningDiseaseDescription;
}
