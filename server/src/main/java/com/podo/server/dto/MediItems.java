package com.podo.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MediItems {

    // 약 이름
    @JsonProperty("itemName")
    private String itemName;
    // 약 제조 회사
    @JsonProperty("entpName")
    private String entpName;
    // 약 생김새
    @JsonProperty("chart")
    private String chart;
    // 약 이미지
    @JsonProperty("itemImage")
    private String itemImage;
    // 약 효과
    @JsonProperty("className")
    private String className;
    // 약 보험코드
    @JsonProperty("ediCode")
    private String ediCode;
}
