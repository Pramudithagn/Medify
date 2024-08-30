package com.pramu.medify.record;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String diagnosis;
    private String prescription;

    @ElementCollection
    @CollectionTable(name = "medical_record_treatments", joinColumns = @JoinColumn(name = "medical_record_id"))
    @Column(name = "treatment_id")
    private List<Long> treatmentIds;

    private Long doctorId;
    private Long patientId;
}
