package com.demoserver.demoserver.dtos.domainDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WarningDto {
  private String uuid;
  private String targetMedicineUuid;
  private String warningMedicineUuid;
  private String warningPatientUuid;
  private String warningDiseaseUuid;
  private String warningMedicineDescription;
  private String warningPatientDescription;
  private String warningDiseaseDescription;
}
