package com.pramu.medify.kafka;

public record MedicalRecordCreatedEvent(
        Long id,
        Long doctorId,
        Long patientId,
        Long paymentId
) {
}
