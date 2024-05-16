package com.podo.server.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDto {

    private String name;
    private LocalDateTime created;
    private LocalDateTime updated;
}
