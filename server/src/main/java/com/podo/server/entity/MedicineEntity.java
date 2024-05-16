package com.podo.server.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "medicine")
public class MedicineEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name="UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(nullable = false)
    private String ediCode; // 약 보험 코드

    @Column(nullable = false)
    private String name; // 약 이름

    @Column(nullable = false)
    private String chart; // 약 생김새

    @Column(nullable = false)
    private String class_name; // 약 효과


    @Column(nullable = false)
    private LocalDateTime created;

    @Column(nullable = false)
    private LocalDateTime updated;

    @ToString.Exclude
    @OneToMany(mappedBy = "medicine_uuid", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<PrescriptionMedicineBridgeEntity> medicine_uuid = new ArrayList<>();

}
