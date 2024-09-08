package com.pramu.medify.doctor;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uuid;
    private String name;
    private String mail;
    private String phone;
    private String photo;
    private LocalDateTime assignedDate;
    private String specialization;

    @Embedded
    private Address address;

    @ElementCollection
    @CollectionTable(name = "doctor_patients", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "patient_id")
    private Set<Long> patientIds;

    @ElementCollection
    @CollectionTable(name = "doctor_medical_records", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "medical_record_id")
    private Set<Long> medicalRecordIds;

    @ElementCollection
    @CollectionTable(name = "doctor_appointments", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "appointment_id")
    private Set<Long> appointmentIds;

    @ElementCollection
    @CollectionTable(name = "doctor_treatments", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "treatment_id")
    private Set<Long> treatmentIds;
}
