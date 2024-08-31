package com.pramu.medify.kafka;

public record MedicalRecordCreatedEvent(
        Long patientId,
        Long doctorId,
        Long id
) {
}
