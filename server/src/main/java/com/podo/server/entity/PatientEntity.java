package com.podo.server.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "patient")

public class PatientEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name="UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private Boolean gender;

    @Column
    private Integer weight;

    @Column
    private Integer height;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private LocalDateTime created;

    @Column(nullable = false)
    private LocalDateTime updated;

    @ToString.Exclude
    @OneToMany(mappedBy = "patient_uuid", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<DiseaseEntity> patient_disease = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "patient_uuid", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<PrescriptionEntity> patient_prescription = new ArrayList<>();

}
