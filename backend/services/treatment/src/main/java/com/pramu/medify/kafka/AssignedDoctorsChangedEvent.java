package com.pramu.medify.kafka;

import java.util.List;
import java.util.Set;

public record AssignedDoctorsChangedEvent(
        Long treatmentId,
        Set<Long> doctorIds
) {
}
