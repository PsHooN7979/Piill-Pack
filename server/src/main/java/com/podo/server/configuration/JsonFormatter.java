package com.podo.server.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import java.io.IOException;

public class JsonFormatter {

    private static final ObjectWriter writer = new ObjectMapper().writerWithDefaultPrettyPrinter();

    public static String format(Object obj) throws IOException {
        return writer.writeValueAsString(obj);
    }
}