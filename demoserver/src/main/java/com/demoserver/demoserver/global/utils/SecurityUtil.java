package com.demoserver.demoserver.global.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.demoserver.demoserver.status.auth.UnauthorizedTokenException;

public class SecurityUtil {
    public static String getCurrentUserEmail() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new UnauthorizedTokenException("Unauthorized Token");
        }
        return authentication.getName();
    }
}