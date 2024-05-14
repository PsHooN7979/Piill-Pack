package com.podo.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class OpenApiDto {

    /**
     * 오픈 API 서버에서 가져온 데이터를 우선적으로 받는 DTO
     */

    private String title;
    private String address;
    private Long areaCode;
    private Long contentTypeId;
    private String firstImage;
    private double mapX;
    private double mapY;

}