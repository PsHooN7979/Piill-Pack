package com.podo.server.service;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.podo.server.dto.MediBody;
import com.podo.server.dto.MediItems;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


public class MediItemsDeserializer extends JsonDeserializer<MediBody> {

    private final ObjectMapper objectMapper;

    public MediItemsDeserializer() {
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public MediBody deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
        JsonNode node = p.getCodec().readTree(p);
        JsonNode itemNode = node.findValue("item");

        List<MediItems> items = Arrays.stream(objectMapper.treeToValue(itemNode, MediItems[].class)).toList();

        return new MediBody(items);
    }
}
