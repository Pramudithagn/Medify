package com.pramu.medify.patient;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public record PatientDTO(
        Long id,
        String uuid,
        String name,
        String mail,
        String phone,
        String photo,
        String gender,
        LocalDate dob,
        Address address,
        LocalDateTime assignedDate,
        String bloodGroup,
        Integer age,
        Double weight,
        Double height,
        String allergies,
        Set<Long> doctorIds,
        Set<Long> medicalRecordIds,
        Set<Long> appointmentIds,
        Set<Long> paymentIds
) {
}
