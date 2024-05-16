package com.podo.server.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.podo.server.dto.MediBody;
import com.podo.server.dto.MediItems;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final ObjectMapper objectMapper;

    public MediBody parsingJsonObject(String json) {
        try {
            return objectMapper.readValue(json, MediBody.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
