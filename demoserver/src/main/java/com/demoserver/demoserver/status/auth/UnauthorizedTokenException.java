package com.demoserver.demoserver.status.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "Unauthorized Token")
public class UnauthorizedTokenException extends RuntimeException {
  public UnauthorizedTokenException(String message) {
    super(message);
  }
}
