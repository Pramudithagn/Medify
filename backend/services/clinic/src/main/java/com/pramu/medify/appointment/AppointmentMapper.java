package com.pramu.medify.appointment;

import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public AppointmentDTO toDto(Appointment appointment) {
        return new AppointmentDTO(
                appointment.getId(),
                appointment.getTitle(),
                appointment.getDateTime(),
                appointment.getDuration(),
                appointment.getDoctorId(),
                appointment.getPatientId()
        );
    }

    public Appointment toEntity(AppointmentDTO dto) {
        return Appointment.builder()
                .title(dto.title())
                .dateTime(dto.dateTime())
                .duration(dto.duration())
                .doctorId(dto.doctorId())
                .patientId(dto.patientId())
                .build();
    }
}
