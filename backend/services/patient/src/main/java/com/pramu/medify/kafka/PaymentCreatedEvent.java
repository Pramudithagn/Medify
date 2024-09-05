package com.pramu.medify.kafka;

import java.math.BigDecimal;

public record PaymentCreatedEvent(
        Long id,
        Long patientId,
        BigDecimal amount
) {
}
