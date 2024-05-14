package com.podo.server.controller;


import com.podo.server.entity.DiseaseNameList;
import com.podo.server.repository.DiseaseNameRepository;
import com.podo.server.repository.PatientRepository;
import com.podo.server.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequiredArgsConstructor
public class PatientController {


    private final DiseaseNameRepository diseaseNameRepository;

    private final PatientService patientService;
    private final PatientRepository patientRepository;

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

        patientService.setPatientInfo(email, nickname, age , height,  weight, gender);
//        System.out.println(auth.getName());

        //디비에 존재하는 배열이름들 다 끌어와서 넣음 -> isDiseaseNameLists
        List<DiseaseNameList> diseaseLists = diseaseNameRepository.findAll();
        ArrayList<String> isDiseaseNameLists = new ArrayList<>();
        diseaseLists.forEach(i -> isDiseaseNameLists.add(i.getName()));

        System.out.println(userSendDisease);
        System.out.println(isDiseaseNameLists);

        List<String> checkedDiseaseInDB = new ArrayList<>(); //유저가보낸 질병이름들 중에서 디비에 있는 질병이름들
        List<String> unCheckedDiseaseInDB = new ArrayList<>(); //유저가보낸 질병이름들 중에서 디비에 없는 질병이름들

        for (int i = 0; i<userSendDisease.toArray().length; i++){
            if(isDiseaseNameLists.contains(userSendDisease.toArray()[i])){ //디비에 유저가보낸 질병이 있는지 없는지 검사해서
                checkedDiseaseInDB.add(userSendDisease.toArray()[i].toString()); //있으면 checkedDiseaseInDB 에 담고
            }else{
                unCheckedDiseaseInDB.add(userSendDisease.toArray()[i].toString()); //없으면 unCheckedDiseaseInDB 에 담고
            }
        }

        System.out.println(checkedDiseaseInDB);
        System.out.println(unCheckedDiseaseInDB);
        //사용자한테 받아온 배여



        return "ok";
    }


}
