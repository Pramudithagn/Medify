package com.pramu.medify.kafka;

import java.time.LocalDateTime;

public record AppointmentCreatedEvent(
        Long id,
        Long patientId,
        Long doctorId,
        LocalDateTime date,
        int duration
) {
}
