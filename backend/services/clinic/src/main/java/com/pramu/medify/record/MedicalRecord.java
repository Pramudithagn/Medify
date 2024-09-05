package com.pramu.medify.record;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    private LocalDateTime assignDate;
    private BigDecimal price;

    @ElementCollection
    @CollectionTable(name = "medical_record_treatments", joinColumns = @JoinColumn(name = "medical_record_id"))
    @Column(name = "treatment_id")
    private List<Long> treatmentIds;

    private Long doctorId;
    private Long patientId;
    private Long paymentId;
}
