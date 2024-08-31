package com.pramu.medify.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClinicKafkaProducer {

    private final KafkaTemplate<String, AppointmentCreatedEvent> appointmentCreatedTemplate;
    private final KafkaTemplate<String, AppointmentCancelledEvent> appointmentCancelledTemplate;
    private final KafkaTemplate<String, MedicalRecordCreatedEvent> medicalRecordCreatedTemplate;

    public void publishAppointmentCreatedEvent(AppointmentCreatedEvent event) {
        appointmentCreatedTemplate.send("appointment-created", event);

    }

    public void publishAppointmentCancelledEvent(AppointmentCancelledEvent event) {
        appointmentCancelledTemplate.send("appointment-cancelled", event);
    }

    public void publishMedicalRecordCreatedEvent(MedicalRecordCreatedEvent event) {
        medicalRecordCreatedTemplate.send("medical-record-created", event);
    }
}
