package com.pramu.medify.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentKafkaProducer {

    private final KafkaTemplate<String, PaymentCreatedEvent> kafkaTemplate;

    public void publishPaymentCreatedEvent(PaymentCreatedEvent event) {
        kafkaTemplate.send("payment-created", event);
    }
}
