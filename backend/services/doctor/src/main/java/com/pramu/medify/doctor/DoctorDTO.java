package com.pramu.medify.doctor;

import java.time.LocalDateTime;
import java.util.Set;

public record DoctorDTO(
        Long id,
        String uuid,
        String name,
        String mail,
        String phone,
        String photo,
        LocalDateTime assignedDate,
        Address address,
        String specialization,
        Set<Long> patientIds,
        Set<Long> medicalRecordIds,
        Set<Long> appointmentIds,
        Set<Long> treatmentIds
) {
}
