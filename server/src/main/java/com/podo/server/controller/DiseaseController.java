package com.podo.server.controller;


import com.podo.server.dto.DiseaseDto;
import com.podo.server.dto.PatientDiseaseDto;
import com.podo.server.jwt.JWTUtil;
import com.podo.server.service.DiseaseService;
import jakarta.validation.Valid;
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
@RequestMapping("/disease")
public class DiseaseController {

    private final DiseaseService diseaseService;
    private final JWTUtil jwtUtil;

    @GetMapping("/list")
    public ResponseEntity<List<DiseaseDto>> getAllDisease(){
        List<DiseaseDto> diseases = diseaseService.getAllDiseases();
        return ResponseEntity.ok(diseases);
    }


}
