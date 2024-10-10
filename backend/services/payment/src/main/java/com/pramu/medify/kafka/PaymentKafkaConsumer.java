package com.pramu.medify.kafka;

import com.pramu.medify.payment.PaymentDTO;
import com.pramu.medify.payment.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentKafkaConsumer {

    private final PaymentService paymentService;

    @Transactional
    @KafkaListener(topics = "medical-record-created")
    public void consumeMedicalRecordCreatedEvent(MedicalRecordCreatedEvent event) {
        paymentService.updatePayment(new PaymentDTO(
                event.paymentId(),
                null,
                null,
                null,
                null,
                null,
                null,
                event.id()
        ));
    }
}
