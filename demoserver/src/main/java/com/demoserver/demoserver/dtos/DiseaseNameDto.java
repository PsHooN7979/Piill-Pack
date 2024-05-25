package com.demoserver.demoserver.dtos;

import java.util.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiseaseNameDto {
  private List<String> diseases;
}
