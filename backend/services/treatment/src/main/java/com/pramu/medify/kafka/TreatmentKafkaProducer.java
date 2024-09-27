package com.pramu.medify.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TreatmentKafkaProducer {

    private final KafkaTemplate<String, AssignedDoctorsChangedEvent> kafkaTemplate;

    public void assignedDoctorsChangedEvent(AssignedDoctorsChangedEvent event) {
        kafkaTemplate.send("treatment-doctors-changed", event);
    }
}
