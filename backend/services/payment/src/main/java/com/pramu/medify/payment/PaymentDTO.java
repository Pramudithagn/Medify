package com.pramu.medify.payment;

public record PaymentDTO(
        Long id,
        String issueDate,
        String dueDate,
        Double amount,
        String method,
        String status,
        Long patientId
) {
}
