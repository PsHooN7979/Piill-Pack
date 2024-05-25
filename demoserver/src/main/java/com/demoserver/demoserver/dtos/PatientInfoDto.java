package com.demoserver.demoserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

import com.demoserver.demoserver.dtos.domainDtos.DiseaseDto;
import com.demoserver.demoserver.dtos.domainDtos.PatientDto;

@Data
@AllArgsConstructor
public class PatientInfoDto {
  private PatientDto patient;
  private List<DiseaseDto> diseaseList;
  private List<PrescriptionDto> prescriptionList;
}
