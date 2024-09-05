package com.pramu.medify.payment;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime issueDate;
    private LocalDateTime dueDate;
    private BigDecimal amount;
    private String method;
    private String status;
    private Long patientId;
    private Long medicalRecordId;
}
