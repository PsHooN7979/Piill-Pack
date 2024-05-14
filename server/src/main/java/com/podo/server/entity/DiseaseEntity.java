package com.podo.server.entity;


import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
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
@Table(name = "disease")
@Builder
public class  DiseaseEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name="UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String symptoms;

    @Column(nullable = false)
    private String prevention;

    @Column(nullable = false)
    private String cause;



    @Column(nullable = false)
    private LocalDateTime created;

    @Column(nullable = false)
    private LocalDateTime updated;


    @ToString.Exclude
    @OneToMany(mappedBy = "disease_uuid", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<PatientDiseaseBridgeEntity> disease_uuid = new ArrayList<>();




}
