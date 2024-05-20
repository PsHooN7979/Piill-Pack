package com.podo.server.controller;


import com.podo.server.dto.DiseaseDto;
import com.podo.server.service.DiseaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/disease")
public class DiseaseController {

    private final DiseaseService diseaseService;

    @GetMapping("/list")
    public ResponseEntity<List<DiseaseDto>> getAllDisease(){
        List<DiseaseDto> diseases = diseaseService.getAllDiseases();
        return ResponseEntity.ok(diseases);
    }
}
