package com.pramu.medify.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorKafkaProducer {

    private final KafkaTemplate<String, DoctorPatientAssignedEvent> kafkaTemplate;

    public void publishDoctorPatientRemovedEvent(DoctorPatientAssignedEvent event) {
        kafkaTemplate.send("patient-removed", event);
    }
}
