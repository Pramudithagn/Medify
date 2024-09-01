package com.pramu.medify.kafka;

public record PaymentCreatedEvent(
        Long id,
        Long patientId,
        double amount
) {
}
