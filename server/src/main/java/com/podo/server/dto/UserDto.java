package com.podo.server.dto;


import lombok.*;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String email;
    private String password;
}
