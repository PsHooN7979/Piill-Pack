package com.podo.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Data
@JsonDeserialize(using = MediBody.MediBodyDeserializer.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MediBody {
    @JsonProperty("items")
    private List<MediItem> items;

    public MediBody(List<MediItem> items) {
        this.items = items;
    }

    public static class MediBodyDeserializer extends com.fasterxml.jackson.databind.JsonDeserializer<MediBody> {
        private final com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();

        @Override
        public MediBody deserialize(com.fasterxml.jackson.core.JsonParser p, com.fasterxml.jackson.databind.DeserializationContext ctxt) throws IOException, com.fasterxml.jackson.core.JsonProcessingException {
            com.fasterxml.jackson.databind.JsonNode node = p.getCodec().readTree(p);
            com.fasterxml.jackson.databind.JsonNode bodyNode = node.path("body");
            com.fasterxml.jackson.databind.JsonNode itemNode = bodyNode.path("items");

            List<MediItem> items = Arrays.asList(objectMapper.treeToValue(itemNode, MediItem[].class));
            return new MediBody(items);
        }
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class MediItem {

        @JsonProperty("ITEM_SEQ")
        private String itemSeq;

        @JsonProperty("ITEM_NAME")
        private String itemName;

        @JsonProperty("ENTP_NAME")
        private String entpName;

        @JsonProperty("CHART")
        private String chart;

        @JsonProperty("ITEM_IMAGE")
        private String itemImage;

        @JsonProperty("CLASS_NAME")
        private String className;

        @JsonProperty("EDI_CODE")
        private String ediCode;

    }
}
