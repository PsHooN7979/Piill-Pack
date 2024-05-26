package com.demoserver.demoserver.dtos.domainDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PatientDto {
  private String image;
  private String email;
  private String nick;
  private int age;
  private int height;
  private int weight;
  private String gender;
}
