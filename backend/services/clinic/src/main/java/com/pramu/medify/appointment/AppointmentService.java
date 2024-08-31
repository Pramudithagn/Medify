package com.pramu.medify.appointment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;

    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(appointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    public AppointmentDTO getAppointmentById(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        return appointment.map(appointmentMapper::toDto).orElse(null);
    }

    public Appointment createAppointment(AppointmentDTO appointmentDTO) {
        // Check for conflicting appointments
        LocalDateTime startTime = appointmentDTO.dateTime();
        LocalDateTime endTime = startTime.plusMinutes(appointmentDTO.duration());
        List<Appointment> conflictingAppointments = appointmentRepository.findByDoctorIdAndDateTimeBetween(
                appointmentDTO.doctorId(), startTime, endTime);

        if (!conflictingAppointments.isEmpty()) {
            throw new IllegalArgumentException("Appointment time conflicts with another appointment.");
        }

        Appointment appointment = appointmentMapper.toEntity(appointmentDTO);
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(AppointmentDTO appointmentDTO) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentDTO.id());
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            LocalDateTime startTime = appointmentDTO.dateTime();
            LocalDateTime endTime = startTime.plusMinutes(appointmentDTO.duration());

            List<Appointment> conflictingAppointments = appointmentRepository.findByDoctorIdAndDateTimeBetween(
                    appointmentDTO.doctorId(), startTime, endTime);

            if (!conflictingAppointments.isEmpty()) {
                throw new IllegalArgumentException("Appointment time conflicts with another appointment.");
            }

            appointment.setDateTime(appointmentDTO.dateTime());
            appointment.setDuration(appointmentDTO.duration());
            appointment.setDoctorId(appointmentDTO.doctorId());
            appointment.setPatientId(appointmentDTO.patientId());

            return appointmentRepository.save(appointment);
        }
        return null;
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
