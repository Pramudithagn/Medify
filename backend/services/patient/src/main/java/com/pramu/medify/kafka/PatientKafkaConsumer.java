package com.pramu.medify.kafka;

import com.pramu.medify.patient.PatientDTO;
import com.pramu.medify.patient.PatientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PatientKafkaConsumer {

    private final PatientService patientService;

    @Transactional
    @KafkaListener(topics = "medical-record-created")
    public void consumeMedicalRecordCreatedEvent(MedicalRecordCreatedEvent event) {
        Set<Long> medicalRecordIds = new HashSet<>();
        medicalRecordIds.add(event.id());

        patientService.updatePatient(new PatientDTO(
                event.patientId(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                medicalRecordIds,
                null,
                null
        ));
    }

    @Transactional
    @KafkaListener(topics = "appointment-created")
    public void consumeAppointmentCreatedEvent(AppointmentCreatedEvent event) {

        Set<Long> appointmentIds = new HashSet<>();
        appointmentIds.add(event.id());

        patientService.updatePatient(new PatientDTO(
                event.patientId(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                appointmentIds,
                null
        ));

    }

    @Transactional
    @KafkaListener(topics = "appointment-cancelled")
    public void consumeAppointmentCancelledEvent(AppointmentCancelledEvent event) {
        patientService.removeAppointment(event);
    }

    @Transactional
    @KafkaListener(topics = "payment-created")
    public void consumePaymentCreatedEvent(PaymentCreatedEvent event) {

        Set<Long> paymentIds = new HashSet<>();
        paymentIds.add(event.id());

        patientService.updatePatient(new PatientDTO(
                event.patientId(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                paymentIds
        ));
    }

}
