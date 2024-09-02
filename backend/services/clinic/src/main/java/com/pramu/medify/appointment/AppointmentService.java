package com.pramu.medify.appointment;

import com.pramu.medify.exception.BusinessException;
import com.pramu.medify.kafka.AppointmentCancelledEvent;
import com.pramu.medify.kafka.AppointmentCreatedEvent;
import com.pramu.medify.kafka.ClinicKafkaProducer;
import jakarta.persistence.EntityNotFoundException;
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
    private final ClinicKafkaProducer clinicKafkaProducer;

    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(appointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    public AppointmentDTO getAppointmentById(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        return appointment.map(appointmentMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with ID:: " + id));
    }

    public Appointment createAppointment(AppointmentDTO appointmentDTO) {
        // Check for conflicting appointments
        LocalDateTime startTime = appointmentDTO.dateTime();
        LocalDateTime endTime = startTime.plusMinutes(appointmentDTO.duration());
        List<Appointment> conflictingAppointments = appointmentRepository.findByDoctorIdAndDateTimeBetween(
                appointmentDTO.doctorId(), startTime, endTime);

        if (!conflictingAppointments.isEmpty()) {
            throw new BusinessException("Appointment time conflicts with another appointment.");
        }

        Appointment appointment = appointmentMapper.toEntity(appointmentDTO);
        appointmentRepository.save(appointment);

        clinicKafkaProducer.publishAppointmentCreatedEvent(new AppointmentCreatedEvent(
                appointment.getId(),
                appointment.getPatientId(),
                appointment.getDoctorId(),
                appointment.getDateTime(),
                appointment.getDuration()
        ));

        return appointment;
    }

    public Appointment updateAppointment(AppointmentDTO appointmentDTO) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentDTO.id());
        if (optionalAppointment.isEmpty()) {
            throw new EntityNotFoundException("Appointment with ID " + appointmentDTO.id() + " not found.");
        }
//        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            LocalDateTime startTime = appointmentDTO.dateTime();
            LocalDateTime endTime = startTime.plusMinutes(appointmentDTO.duration());

            List<Appointment> conflictingAppointments = appointmentRepository.findByDoctorIdAndDateTimeBetween(
                    appointmentDTO.doctorId(), startTime, endTime);

            if (!conflictingAppointments.isEmpty()) {
                throw new BusinessException("Appointment time conflicts with another appointment.");
            }

            appointment.setDateTime(appointmentDTO.dateTime());
            appointment.setDuration(appointmentDTO.duration());
            appointment.setDoctorId(appointmentDTO.doctorId());
            appointment.setPatientId(appointmentDTO.patientId());

            return appointmentRepository.save(appointment);
//        }
//        return null;
    }

    public Long deleteAppointment(Long id) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
        if (optionalAppointment.isEmpty()) {
            throw new EntityNotFoundException("Appointment with ID " + id + " not found.");
        }
//        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();

            appointmentRepository.deleteById(id);

            clinicKafkaProducer.publishAppointmentCancelledEvent(new AppointmentCancelledEvent(
                    id,
                    appointment.getPatientId(),
                    appointment.getDoctorId()
            ));
            return id;
//        }
//        return null;
    }
}
