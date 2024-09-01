package com.pramu.medify.doctor;

import com.pramu.medify.kafka.DoctorPatientAssignedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorKafkaProducer {

    private final KafkaTemplate<String, DoctorPatientAssignedEvent> kafkaTemplate;

    public void publishDoctorPatientAssignedEvent(DoctorPatientAssignedEvent event) {
        kafkaTemplate.send("doctor-assigned", event);
    }
}
