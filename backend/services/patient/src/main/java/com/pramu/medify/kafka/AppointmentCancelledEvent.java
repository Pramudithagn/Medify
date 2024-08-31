package com.pramu.medify.kafka;

public record AppointmentCancelledEvent(
        Long id,
        Long patientId,
        Long doctorId
) {
}
