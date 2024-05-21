package com.podo.server.controller;


import com.podo.server.dto.PatientDiseaseDto;
import com.podo.server.dto.PatientDto;
import com.podo.server.dto.PatientProfileImageDto;
import com.podo.server.entity.DiseaseNameList;
import com.podo.server.entity.PatientEntity;
import com.podo.server.exception.BusinessLogicException;
import com.podo.server.jwt.JWTUtil;
import com.podo.server.repository.DiseaseNameRepository;
import com.podo.server.repository.PatientRepository;
import com.podo.server.service.DiseaseService;
import com.podo.server.service.PatientService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/patient")
public class PatientController {


    private final DiseaseNameRepository diseaseNameRepository;

    private final PatientService patientService;
    private final PatientRepository patientRepository;
    private final JWTUtil jwtUtil;
    private final DiseaseService diseaseService;

//      email인증 미구현 상태 나중에 해야함
//    @GetMapping("/checkisemail")
//    public String checkisemail(Authentication auth) {
//        System.out.println(auth.getName());
//
//
//        return "ok";
//    }

    @PostMapping("/setpatientinfo")
    public String setPatientInfo(@RequestBody HashMap<String, Object> map, Authentication auth) {
        String email = auth.getName();
        String nickname = (String) map.get("nickname");
        Integer age = (Integer) map.get("age");
        Integer height = (Integer) map.get("height");
        Integer weight = (Integer) map.get("weight");
        boolean gender = (boolean) map.get("gender");
        ArrayList<String> userSendDisease = (ArrayList<String>) map.get("userDiseaseList");

        patientService.setPatientInfo(email, nickname, age, height, weight, gender);
//        System.out.println(auth.getName());

        //디비에 존재하는 배열이름들 다 끌어와서 넣음 -> isDiseaseNameLists
        List<DiseaseNameList> diseaseLists = diseaseNameRepository.findAll();
        ArrayList<String> isDiseaseNameLists = new ArrayList<>();
        diseaseLists.forEach(i -> isDiseaseNameLists.add(i.getName()));

        System.out.println(userSendDisease);
        System.out.println(isDiseaseNameLists);

        List<String> checkedDiseaseInDB = new ArrayList<>(); //유저가보낸 질병이름들 중에서 디비에 있는 질병이름들
        List<String> unCheckedDiseaseInDB = new ArrayList<>(); //유저가보낸 질병이름들 중에서 디비에 없는 질병이름들

        for (int i = 0; i < userSendDisease.toArray().length; i++) {
            if (isDiseaseNameLists.contains(userSendDisease.toArray()[i])) { //디비에 유저가보낸 질병이 있는지 없는지 검사해서
                checkedDiseaseInDB.add(userSendDisease.toArray()[i].toString()); //있으면 checkedDiseaseInDB 에 담고
            } else {
                unCheckedDiseaseInDB.add(userSendDisease.toArray()[i].toString()); //없으면 unCheckedDiseaseInDB 에 담고
            }
        }

        System.out.println(checkedDiseaseInDB);
        System.out.println(unCheckedDiseaseInDB);
        //사용자한테 받아온 배여


        return "ok";
    }

    @GetMapping("/info")
    public ResponseEntity<PatientDto> getPatientInfo(@RequestHeader("Authorization") String token) {

        UUID id = jwtUtil.getId(token.substring(7));  // 토큰에 저장된 유저id 정보 가져옴

        Optional<PatientEntity> patientEntity = patientService.patientId(id);
        if (patientEntity.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        PatientEntity patient = patientEntity.get();
        PatientDto patientDto = patientService.getPatientInfo(patient);

        return new ResponseEntity<>(patientDto, HttpStatus.OK);

    }

    @PostMapping("/addDisease")
    public ResponseEntity<String> addPatientDisesase(@RequestBody PatientDiseaseDto dto,
                                                     @RequestHeader("Authorization") String token){

        try {
            UUID id = jwtUtil.getId(token.substring(7)); // 토큰에 저장된 사용자 id(UUID 형식) 가져옴
            diseaseService.addPatientDisease(dto, id);

            return new ResponseEntity<>("질병 추가 성공!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 정보 수정
    @PutMapping("/modify")
    public ResponseEntity<String> registerInfo(@RequestBody @Valid PatientDto dto, @RequestHeader("Authorization") String token) {
        try {
            String email = jwtUtil.getUsername(token.substring(7));  // 토큰에 저장된 이메일 정보 가져옴
            patientService.registerInfo(dto, email);  // 서비스 로직 불러움

            return new ResponseEntity<>("Information saved successfully!", HttpStatus.OK);  // 성공
        } catch (BusinessLogicException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);  // 실패
        }
    }

    @PostMapping("/image")
    public ResponseEntity<String> profileImage(@RequestHeader("Authorization") String token,
                                               @RequestBody MultipartFile file) {
        try {
            UUID id = jwtUtil.getId(token.substring(7)); // 토큰에 저장된 사용자 id(UUID 형식) 가져옴
            patientService.profileImage(id, file);
            return new ResponseEntity<>("프로필 이미지 등록 성공!", HttpStatus.OK);
        } catch (IOException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);  // 실패
        }
    }


}
