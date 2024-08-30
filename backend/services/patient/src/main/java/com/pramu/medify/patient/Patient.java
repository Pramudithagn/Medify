package com.pramu.medify.patient;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String mail;
    private String phone;
    private String photo;
    private String gender;
    private String dob;
    private String address;
    private String assignedDate;
    private String bloodGroup;
    private Integer age;
    private Double weight;
    private Double height;
    private String allergies;

    @ElementCollection
    @CollectionTable(name = "patient_doctors", joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "doctor_id")
    private Set<Long> doctorIds;

    @ElementCollection
    @CollectionTable(name = "patient_medical_records", joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "medical_record_id")
    private Set<Long> medicalRecordIds;

    @ElementCollection
    @CollectionTable(name = "patient_appointments", joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "appointment_id")
    private Set<Long> appointmentIds;

    @ElementCollection
    @CollectionTable(name = "patient_payments", joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "payment_id")
    private Set<Long> paymentIds;
}
