package com.pramu.medify.notification;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // doctorId patientId adminIdd
    private String userType; //  "DOCTOR" "PATIENT" "ADMIN"
    private String message;
    private String notificationType;
    private LocalDateTime createdAt;
    private boolean isRead;
}
