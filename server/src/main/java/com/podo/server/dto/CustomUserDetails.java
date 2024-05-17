package com.podo.server.dto;

import com.podo.server.entity.PatientEntity;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final PatientEntity patientEntity;




    public UUID getId() {
        return patientEntity.getId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return null;
            }
        });
        return collection;
    }


    @Override
    public String getPassword() {
        return patientEntity.getPassword();
    }

    @Override
    public String getUsername() {
        return patientEntity.getEmail();
    }



    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}