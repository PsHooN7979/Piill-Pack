package com.demoserver.demoserver.models;

import java.time.LocalDateTime;
import java.util.stream.*;
import java.util.*;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.demoserver.demoserver.models.bridges.PatientDiseaseBridgeModel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "patient")
public class PatientModel implements UserDetails {
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String uuid;

  @ElementCollection(fetch = FetchType.EAGER)
  @Builder.Default
  private List<String> roles = new ArrayList<>();

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.roles.stream()
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());
  }

  @Column(unique = true, nullable = false, length = 255)
  private String email;

  @Column(nullable = false, length = 255)
  private String password;

  @Column(nullable = true, length = 255)
  private String nick;

  @Column(name = "is_valid", nullable = false)
  private Boolean isValid;

  @Column(name = "is_first", nullable = false)
  private Boolean isFirst;

  @Column(nullable = false, length = 255)
  private String token;

  @Column(name = "profile_image_url", nullable = true, columnDefinition = "TEXT")
  private String profileImageUrl;

  @Column(nullable = true)
  private int age;

  @Column(nullable = true)
  private int height;

  @Column(nullable = true)
  private int weight;

  @Column(nullable = true)
  private Boolean gender;

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime created;

  @LastModifiedDate
  @Column(nullable = false)
  private LocalDateTime updated;

  @ToString.Exclude
  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  @Builder.Default
  private List<PatientDiseaseBridgeModel> patient_DiseaseBridgeModels = new ArrayList<>();

  public void addPatient_DiseasesBridge(PatientDiseaseBridgeModel patient_DiseaseBridgeModel) {
    patient_DiseaseBridgeModels.add(patient_DiseaseBridgeModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  @Builder.Default
  private List<PrescriptionModel> prescriptionModels = new ArrayList<>();

  public void addPrescription(PrescriptionModel prescriptionModel) {
    prescriptionModels.add(prescriptionModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "warningPatient", cascade = CascadeType.ALL)
  @Builder.Default
  private List<WarningModel> warningModels = new ArrayList<>();

  public void addWarning(WarningModel warningModel) {
    warningModels.add(warningModel);
  }

  @ToString.Exclude
  @OneToMany(mappedBy = "dangerPatient", cascade = CascadeType.ALL)
  @Builder.Default
  private List<DangerModel> dangerModels = new ArrayList<>();

  public void addDanger(DangerModel dangerModel) {
    dangerModels.add(dangerModel);
  }

  // Security get, set
  @Override
  public String getUsername() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getUsername'");
  }

  @Override
  public boolean isAccountNonExpired() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'isAccountNonExpired'");
  }

  @Override
  public boolean isAccountNonLocked() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'isAccountNonLocked'");
  }

  @Override
  public boolean isCredentialsNonExpired() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'isCredentialsNonExpired'");
  }

  @Override
  public boolean isEnabled() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'isEnabled'");
  }
}
