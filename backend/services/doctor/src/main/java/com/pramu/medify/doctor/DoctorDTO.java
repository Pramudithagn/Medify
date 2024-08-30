package com.pramu.medify.doctor;

import java.util.Set;

public record DoctorDTO(
        Long id,
        String name,
        String mail,
        String phone,
        String photo,
        Address address,
        String specialization,
        Set<Long> patientIds,
        Set<Long> medicalRecordIds,
        Set<Long> appointmentIds,
        Set<Long> treatmentIds
) {
}
