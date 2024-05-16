package com.podo.server.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonDeserialize(using = MediBody.MediBodyDeserializer.class)
public class MediBody {
    @JsonProperty("items")
    private List<MediItems> items;

    public static class MediBodyDeserializer extends com.fasterxml.jackson.databind.JsonDeserializer<MediBody> {
        private final com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();

        @Override
        public MediBody deserialize(com.fasterxml.jackson.core.JsonParser p, com.fasterxml.jackson.databind.DeserializationContext ctxt) throws IOException, com.fasterxml.jackson.core.JsonProcessingException {
            com.fasterxml.jackson.databind.JsonNode node = p.getCodec().readTree(p);
            com.fasterxml.jackson.databind.JsonNode bodyNode = node.path("body");
            com.fasterxml.jackson.databind.JsonNode itemNode = bodyNode.path("items");

            List<MediItems> items = Arrays.asList(objectMapper.treeToValue(itemNode, MediItems[].class));
            return new MediBody(items);
        }
    }
}