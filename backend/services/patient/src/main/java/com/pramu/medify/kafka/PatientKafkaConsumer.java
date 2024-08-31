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

    @KafkaListener(topics = "medical-record-created", groupId = "clinic-group")
    public void consumeMedicalRecordCreatedEvent(MedicalRecordCreatedEvent event) {
        Set<Long> medicalRecordIds = new HashSet<>();
        medicalRecordIds.add(event.id());

//        doctorService.updateMedicalRecords(event.getPatientId(), event.getMedicalRecordId());
        patientService.updatePatient(new PatientDTO(
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
                medicalRecordIds,
                null,
                null
        ));
    }

    @Transactional
    @KafkaListener(topics = "appointment-created")
    public void consumeAppointmentCreatedEvent(AppointmentCreatedEvent event) {

        System.out.println("consume start from patient "+ event);
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
        System.out.println("consume end from patient "+ event);

    }

//    @KafkaListener(topics = "appointment-cancelled", groupId = "clinic-group")
//    public void consumeAppointmentCancelledEvent(AppointmentCancelledEvent event) {
//        Set<Long> treatmentIds = new HashSet<>();
//        treatmentIds.add(event.id());
//
////        doctorService.removeAppointment(event.getPatientId(), event.getAppointmentId());
//        patientService.updatePatient(new PatientDTO(
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                null,
//                treatmentIds
//        ));
//    }

    @Transactional
    @KafkaListener(topics = "appointment-cancelled")
    public void consumeAppointmentCancelledEvent(AppointmentCancelledEvent event) {
        patientService.removeAppointment(event);
    }


}
