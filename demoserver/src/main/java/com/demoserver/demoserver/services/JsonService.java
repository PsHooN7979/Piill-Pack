package com.demoserver.demoserver.services;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JsonService {

  public static Map<String, Object> getMapFromJsonObject(JSONObject jsonObject) {
    try {
      return new ObjectMapper().readValue(jsonObject.toString(), Map.class);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static List<Map<String, Object>> getListMapFromJsonArray(JSONArray jsonArray) {
    List<Map<String, Object>> list = new ArrayList<>();
    for (int i = 0; i < jsonArray.length(); i++) {
      Map<String, Object> map = getMapFromJsonObject(jsonArray.getJSONObject(i));
      list.add(map);
    }
    return list;
  }
}
