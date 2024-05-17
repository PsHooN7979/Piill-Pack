package com.podo.server.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.podo.server.dto.MediBody;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final ObjectMapper objectMapper;

    public MediBody parsingJsonObject(String json) throws IOException {
        return objectMapper.readValue(json, MediBody.class);
    }

    public String transformResponse(String json) throws IOException {
        MediBody mediBody = parsingJsonObject(json);

        // Extract the items list
        List<MediBody.MediItem> items = mediBody.getBody().getItems();

        // Create a new JSON node to store the transformed response
        JsonNode transformedNode = objectMapper.valueToTree(items);


        // Convert the JSON node to a string
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(transformedNode);
    }
}
