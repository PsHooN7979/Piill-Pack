package com.podo.server.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiseaseDto {

    private String name;
    private String symptoms;
    private String prevention;
    private String cause;
    private LocalDateTime created;
    private LocalDateTime updated;

}
