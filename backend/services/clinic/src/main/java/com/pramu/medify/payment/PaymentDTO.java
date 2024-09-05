package com.pramu.medify.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentDTO(
        Long id,
        LocalDateTime issueDate,
        LocalDateTime dueDate,
        BigDecimal amount,
        String method,
        String status,
        Long patientId,
        Long medicalRecordId
) {
}
