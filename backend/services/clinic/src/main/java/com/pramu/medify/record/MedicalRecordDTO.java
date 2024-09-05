package com.pramu.medify.record;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record MedicalRecordDTO(
        Long id,
        String diagnosis,
        String prescription,
        LocalDateTime assignDate,
        BigDecimal price,
        List<Long> treatmentIds,
        Long doctorId,
        Long patientId,
        Long paymentId
) {
}
