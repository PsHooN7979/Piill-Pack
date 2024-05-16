package com.podo.server.controller;

import com.podo.server.dto.PrescriptionDto;
import com.podo.server.entity.PrescriptionEntity;
import com.podo.server.jwt.JWTUtil;
import com.podo.server.service.PrescriptionService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/presc")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final JWTUtil jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<String> addPresc(@RequestBody PrescriptionDto dto,
                                                       @RequestHeader("Authorization") String token) {
        try {
            UUID id = jwtUtil.getId(token.substring(7)); // 토큰에 저장된 사용자 id(UUID 형식) 가져옴

            prescriptionService.addPresc(dto, id);

            return new ResponseEntity<>("처방전 추가 성공!",HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
