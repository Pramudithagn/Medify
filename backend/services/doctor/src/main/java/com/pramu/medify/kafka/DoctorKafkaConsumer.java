package com.pramu.medify.kafka;

import com.pramu.medify.doctor.DoctorDTO;
import com.pramu.medify.doctor.DoctorService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DoctorKafkaConsumer {

    private final DoctorService doctorService;

    @Transactional
    @KafkaListener(topics = "doctor-assigned")
    public void consumeDoctorPatientAssignedEvent(DoctorPatientAssignedEvent event) {
        Set<Long> patientIds = new HashSet<>();
        patientIds.add(event.patientId());

        doctorService.doctorPatientAssignUpdate(new DoctorDTO(
                event.doctorId(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                patientIds,
                null,
                null,
                null
        ));
    }

    @Transactional
    @KafkaListener(topics = "medical-record-created")
    public void consumeMedicalRecordCreatedEvent(MedicalRecordCreatedEvent event) {
        Set<Long> medicalRecordIds = new HashSet<>();
        medicalRecordIds.add(event.id());

        doctorService.updateDoctor(new DoctorDTO(
                event.doctorId(),
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

        doctorService.updateDoctor(new DoctorDTO(
                event.doctorId(),
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
        doctorService.removeAppointment(event);
    }

    @Transactional
    @KafkaListener(topics = "treatment-doctors-changed")
    public void consumeAssignedDoctorsChangedEvent(AssignedDoctorsChangedEvent event) {

        Set<Long> treatmentIds = new HashSet<>();
        treatmentIds.add(event.treatmentId());
//        Set<Long> doctorIds = new HashSet<>(event.doctorIds());
        for (Long doctorId : event.doctorIds()) {
            doctorService.updateDoctor(new DoctorDTO(
                    doctorId,
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
                    treatmentIds
            ));
        }
    }

}
