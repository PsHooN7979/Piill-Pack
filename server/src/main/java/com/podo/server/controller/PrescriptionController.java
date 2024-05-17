package com.podo.server.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.podo.server.dto.ModifyPresDto;
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

import java.util.List;
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

            return new ResponseEntity<>("처방전 추가 성공!", HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/modify/{id}")
    public ResponseEntity<String> modifyPrescription(@RequestBody PrescriptionDto dto,
                                                   @PathVariable("id") UUID id,
                                                   @RequestHeader("Authorization") String token) {
        try {
            UUID patientId = jwtUtil.getId(token.substring(7));  // Extract patient ID from the token
            prescriptionService.deletePresc(id); // 삭제
            prescriptionService.addPresc(dto, patientId); // 생성
            return new ResponseEntity<>("처방전 수정 성공!",HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePresc(@PathVariable("id") UUID id,
                                              @RequestHeader("Authorization") String token){
        try{
            UUID patiendId = jwtUtil.getId(token.substring(7));
            prescriptionService.deletePresc(id);
            return new ResponseEntity<>("처방전이 성공적으로 삭제되었습니다.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            log.error("Prescription not found: {}", id, e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error occurred while deleting prescription: {}", id, e);
            return new ResponseEntity<>("처방전을 삭제하는 동안 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
