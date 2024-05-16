package com.podo.server.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDto {

    private String name;
    private List<MedicineDto> medicines;
    private LocalDateTime created;
    private LocalDateTime updated;

    @Data
    public static class MedicineDto {

        private String ediCode;
        private String name;
        private String chart;
        private String class_name;
    }
}
