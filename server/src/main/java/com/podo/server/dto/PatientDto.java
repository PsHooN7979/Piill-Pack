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
public class PatientDto {

    private String email;
    private String password;
    private Integer age;
    private Boolean gender;
    private Integer weight;
    private Integer height;
    private String nickname;
    private Boolean is_fist;
    private LocalDateTime updated;

}
