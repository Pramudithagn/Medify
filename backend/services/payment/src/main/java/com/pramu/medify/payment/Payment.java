package com.pramu.medify.payment;

import jakarta.persistence.*;
import lombok.*;

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
    private String issueDate;
    private String dueDate;
    private Double amount;
    private String method;
    private String status;
    private Long patientId;
}
