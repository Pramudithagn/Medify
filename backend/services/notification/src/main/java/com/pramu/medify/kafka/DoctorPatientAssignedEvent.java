package com.pramu.medify.kafka;

public record DoctorPatientAssignedEvent(
        Long patientId,
        Long doctorId
) {
}
