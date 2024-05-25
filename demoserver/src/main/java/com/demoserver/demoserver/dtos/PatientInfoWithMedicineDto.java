package com.demoserver.demoserver.dtos;

import java.util.List;

import com.demoserver.demoserver.dtos.domainDtos.MedicineDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PatientInfoWithMedicineDto {
  private PatientInfoDto patientInfo;
  private List<MedicineDto> analyzeMedicine;
}
