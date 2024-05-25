package com.demoserver.demoserver.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.demoserver.demoserver.interfaces.IPatientRepo;
import com.demoserver.demoserver.models.PatientModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final IPatientRepo iPatientRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return iPatientRepo.findPatientByEmail(email)
                .map(this::createPatientDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    private UserDetails createPatientDetails(PatientModel patientModel) {
        return User.builder()
                .username(patientModel.getEmail())
                .password(patientModel.getPassword())
                // .roles(userModel.getRoles().toArray(new String[0]))
                .authorities("auth")
                .build();
    }
}