package com.pramu.medify.payment;

import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentDTO toDto(Payment payment) {
        return new PaymentDTO(
                payment.getId(),
                payment.getIssueDate(),
                payment.getDueDate(),
                payment.getAmount(),
                payment.getMethod(),
                payment.getStatus(),
                payment.getPatientId()
        );
    }

    public Payment toEntity(PaymentDTO dto) {
        return Payment.builder()
                .issueDate(dto.issueDate())
                .dueDate(dto.dueDate())
                .amount(dto.amount())
                .method(dto.method())
                .status(dto.status())
                .patientId(dto.patientId())
                .build();
    }
}
