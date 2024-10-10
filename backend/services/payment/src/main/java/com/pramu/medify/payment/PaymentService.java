package com.pramu.medify.payment;

import com.pramu.medify.exception.ResourceNotFoundException;
import com.pramu.medify.kafka.PaymentCreatedEvent;
import com.pramu.medify.kafka.PaymentKafkaProducer;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    private final PaymentKafkaProducer paymentKafkaProducer;

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentMapper::toDto)
                .collect(Collectors.toList());
    }

    public PaymentDTO getPaymentById(Long id) {
        Optional<Payment> payment = paymentRepository.findById(id);
        return payment.map(paymentMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Payment entry not found with ID:: " + id));
    }

    public List<PaymentDTO> getPaymentsByUserId(Long userId) {
        return getAllPayments()
                .stream().filter(payment -> Objects.equals(payment.patientId(), userId))
                .toList();
    }

    public Payment createPayment(PaymentDTO paymentDTO) {
        Payment payment = paymentMapper.toEntity(paymentDTO);
        Payment savedPayment = paymentRepository.save(payment);

        paymentKafkaProducer.publishPaymentCreatedEvent(new PaymentCreatedEvent(
                savedPayment.getId(),
                payment.getPatientId(),
                payment.getAmount()
        ));
        return savedPayment;
    }

    public Payment updatePayment(PaymentDTO paymentDTO) {
        Optional<Payment> optionalPayment = paymentRepository.findById(paymentDTO.id());

        if (optionalPayment.isEmpty()) {
            throw new ResourceNotFoundException("Payment entry with ID " + paymentDTO.id() + " not found.");
        }
        Payment payment = optionalPayment.get();

        if (paymentDTO.issueDate() != null) {
            payment.setIssueDate(paymentDTO.issueDate());
        }
        if (paymentDTO.dueDate() != null) {
            payment.setDueDate(paymentDTO.dueDate());
        }
        if (paymentDTO.amount() != null) {
            payment.setAmount(paymentDTO.amount());
        }
        if (paymentDTO.method() != null) {
            payment.setMethod(paymentDTO.method());
        }
        if (paymentDTO.status() != null) {
            payment.setStatus(paymentDTO.status());
        }
        if (paymentDTO.patientId() != null) {
            payment.setPatientId(paymentDTO.patientId());
        }
        if (paymentDTO.medicalRecordId() != null) {
            payment.setMedicalRecordId(paymentDTO.medicalRecordId());
        }

        return paymentRepository.save(payment);
    }

    public Long deletePayment(Long id) {
        Optional<Payment> optionalPayment = paymentRepository.findById(id);
        if (optionalPayment.isEmpty()) {
            throw new EntityNotFoundException("Doctor with ID " + id + " not found.");
        }
        Payment payment = optionalPayment.get();

        paymentRepository.delete(payment);
        return id;
    }
}
