package com.pramu.medify.appointment;

import java.time.LocalDateTime;

public record AppointmentDTO(
        Long id,
        LocalDateTime dateTime,
        Integer duration,
        Long doctorId,
        Long patientId
) {
}
