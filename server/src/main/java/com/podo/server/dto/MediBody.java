package com.podo.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MediBody {

    @JsonProperty("body")
    private Body body;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Body {
        @JsonProperty("items")
        private List<MediItem> items;
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
