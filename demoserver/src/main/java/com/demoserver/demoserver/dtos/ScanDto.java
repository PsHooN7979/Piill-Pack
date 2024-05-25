package com.demoserver.demoserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ScanDto {
  @JsonProperty(value = "base64_image_to_string")
  private String base64ImageToString;
}
