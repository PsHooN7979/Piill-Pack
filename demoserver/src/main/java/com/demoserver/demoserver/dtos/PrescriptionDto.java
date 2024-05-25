package com.demoserver.demoserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

import com.demoserver.demoserver.dtos.domainDtos.DangerDto;
import com.demoserver.demoserver.dtos.domainDtos.MedicineDto;
import com.demoserver.demoserver.dtos.domainDtos.WarningDto;

@Data
@AllArgsConstructor
public class PrescriptionDto {
  private String name;
  private List<MedicineDto> medicineList;
  private List<WarningDto> warningList;
  private List<DangerDto> dangerList;
}
