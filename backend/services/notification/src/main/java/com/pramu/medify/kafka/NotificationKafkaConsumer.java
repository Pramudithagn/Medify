package com.pramu.medify.kafka;

import com.pramu.medify.notification.NotificationService;
import com.pramu.medify.notification.NotificationType;
import com.pramu.medify.notification.UserType;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationKafkaConsumer {

    private final NotificationService notificationService;

    @KafkaListener(topics = "doctor-assigned")
    public void consumeDoctorAssignedEvent(DoctorPatientAssignedEvent event) {
        String message = "You have been assigned a new doctor with ID: " + event.doctorId();
        notificationService.sendNotification(event.patientId(), UserType.PATIENT.name(),
                NotificationType.DOCTOR_ASSIGNATION.name(), message);

        message = "You have been assigned to a new patient with ID: " + event.patientId();
        notificationService.sendNotification(event.doctorId(), UserType.DOCTOR.name(),
                NotificationType.DOCTOR_ASSIGNATION.name(), message);

//        message = "Doctor assigned to a doctor with ID: " + event.doctorId() + "and patient " +
//                "with ID: " + event.patientId();
//        notificationService.sendNotification(event.doctorId(), UserType.ADMIN, message);
    }

    @KafkaListener(topics = "medical-record-created")
    public void consumeMedicalRecordCreatedEvent(MedicalRecordCreatedEvent event) {
        String message = "A new medical record has been created with ID: " + event.id();
        notificationService.sendNotification(event.patientId(), UserType.PATIENT.name(),
                NotificationType.MEDICAL_RECORD_CREATION.name(), message);
        notificationService.sendNotification(event.doctorId(), UserType.DOCTOR.name(),
                NotificationType.MEDICAL_RECORD_CREATION.name(), message);
//        notificationService.sendNotification(event.doctorId(), UserType.ADMIN, message);
    }

    @KafkaListener(topics = "appointment-created")
    public void consumeAppointmentCreatedEvent(AppointmentCreatedEvent event) {
        String message = "A new appointment has been created with ID: " + event.id() +
                " on " + event.date();
        notificationService.sendNotification(event.patientId(), UserType.PATIENT.name(),
                NotificationType.APPOINTMENT_CREATION.name(), message);
        notificationService.sendNotification(event.doctorId(), UserType.DOCTOR.name(),
                NotificationType.APPOINTMENT_CREATION.name(), message);
//        notificationService.sendNotification(event.doctorId(), UserType.ADMIN, message);
    }

    @KafkaListener(topics = "appointment-cancelled")
    public void consumeAppointmentCancelledEvent(AppointmentCancelledEvent event) {
        String message = "Your appointment with ID: " + event.id() + " has been cancelled.";
        notificationService.sendNotification(event.patientId(), UserType.PATIENT.name(),
                NotificationType.APPOINTMENT_CANCELLATION.name(), message);
        notificationService.sendNotification(event.doctorId(), UserType.DOCTOR.name(),
                NotificationType.APPOINTMENT_CANCELLATION.name(), message);
//        notificationService.sendNotification(event.doctorId(), UserType.ADMIN, message);
    }

    @KafkaListener(topics = "payment-created")
    public void consumePaymentCreatedEvent(PaymentCreatedEvent event) {
        String message = "A new payment has been recorded with ID: " + event.id() +
                " and amount: " + event.amount();
        notificationService.sendNotification(event.id(), UserType.PATIENT.name(),
                NotificationType.PAYMENT_CREATION.name(), message);
//        notificationService.sendNotification(event.id(), UserType.ADMIN, message);
    }
}
