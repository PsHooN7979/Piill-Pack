package com.demoserver.demoserver.models.listeners;

import java.time.LocalDateTime;

import com.demoserver.demoserver.global.interfaces.Iauditable;

import jakarta.persistence.PrePersist;

public class DatePersistListener {

  @PrePersist
  public void prePersist(Object object) {
    if (object instanceof Iauditable) {
      ((Iauditable) object).setCreated(LocalDateTime.now());
      ((Iauditable) object).setUpdated(LocalDateTime.now());
    }
  }
}
