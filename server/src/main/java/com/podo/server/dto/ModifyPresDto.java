package com.podo.server.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifyPresDto {
    private String name;
    private List<MedicineDto> medicines;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MedicineDto {
        private String ediCode;
        private String name;
        private String chart;
        private String className;
        private String itemSeq;
    }
}
