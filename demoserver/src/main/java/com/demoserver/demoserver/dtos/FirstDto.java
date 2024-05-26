package com.demoserver.demoserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
public class FirstDto {
  private String image;
  private String nick;
  private int age;
  private int height;
  private int weight;
  private String gender;
  @JsonProperty(value = "disease_list")
  private List<String> diseaseList;
}
