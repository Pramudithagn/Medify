package com.pramu.medify.doctor;

import com.pramu.medify.kafka.AppointmentCancelledEvent;
import com.pramu.medify.kafka.DoctorKafkaProducer;
import com.pramu.medify.kafka.DoctorPatientAssignedEvent;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;
    private final DoctorKafkaProducer doctorKafkaProducer;

    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(doctorMapper::toDto)
                .collect(Collectors.toList());
    }

    public DoctorDTO getDoctorById(Long id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        return doctor.map(doctorMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found with ID:: " + id));
    }

    public Doctor createDoctor(DoctorDTO doctorDTO) {
        Doctor doctor = doctorMapper.toEntity(doctorDTO);
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(DoctorDTO doctorDTO) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorDTO.id());

        if (optionalDoctor.isEmpty()) {
            throw new EntityNotFoundException("Doctor with ID " + doctorDTO.id() + " not found.");
        }
        Doctor doctor = optionalDoctor.get();

        if (doctorDTO.name() != null) {
            doctor.setName(doctorDTO.name());
        }
        if (doctorDTO.mail() != null) {
            doctor.setMail(doctorDTO.mail());
        }
        if (doctorDTO.phone() != null) {
            doctor.setPhone(doctorDTO.phone());
        }
        if (doctorDTO.photo() != null) {
            doctor.setPhoto(doctorDTO.photo());
        }
        if (doctorDTO.assignedDate() != null) {
            doctor.setAssignedDate(doctorDTO.assignedDate());
        }
        if (doctorDTO.address() != null) {
            doctor.setAddress(doctorDTO.address());
        }
        if (doctorDTO.specialization() != null) {
            doctor.setSpecialization(doctorDTO.specialization());
        }
//        if (doctorDTO.patientIds() != null) {
//            doctor.getPatientIds().addAll(doctorDTO.patientIds());
//        }

        if (doctorDTO.patientIds() != null) {
            if (doctor.getPatientIds().size() > doctorDTO.patientIds().size()) {

                for (Long patientId : doctor.getPatientIds()) {
                    if (!doctorDTO.patientIds().contains(patientId)) {
                        doctorKafkaProducer.publishDoctorPatientRemovedEvent(new DoctorPatientAssignedEvent(
                                patientId,
                                doctorDTO.id()
                        ));
                    }
                }
                doctor.setPatientIds(doctorDTO.patientIds());

            }
        }
        if (doctorDTO.medicalRecordIds() != null) {
            doctor.getMedicalRecordIds().addAll(doctorDTO.medicalRecordIds());
        }
        if (doctorDTO.appointmentIds() != null) {
            doctor.getAppointmentIds().addAll(doctorDTO.appointmentIds());
        }
//        if (doctorDTO.treatmentIds() != null) {
//            doctor.getTreatmentIds().addAll(doctorDTO.treatmentIds());
//        }
        if (doctorDTO.treatmentIds() != null) {
//            doctor.setTreatmentIds(doctorDTO.treatmentIds());
            for (Long treatmentId : doctorDTO.treatmentIds()) {
                if (doctor.getTreatmentIds().contains(treatmentId)) {
                    doctor.getTreatmentIds().remove(treatmentId);
                } else {
                    doctor.getTreatmentIds().add(treatmentId);
                }
            }
        }

        return doctorRepository.save(doctor);
    }

    public void doctorPatientAssignUpdate(DoctorDTO doctorDTO) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorDTO.id());
        if (optionalDoctor.isEmpty()) {
            throw new EntityNotFoundException("Doctor tried to assign has not found. ID :" + doctorDTO.id());
        }
        Doctor doctor = optionalDoctor.get();

        if (doctorDTO.patientIds() != null) {
            doctor.getPatientIds().addAll(doctorDTO.patientIds());
        }

        doctorRepository.save(doctor);
    }

    public void removeAppointment(AppointmentCancelledEvent event) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(event.doctorId());
        if (optionalDoctor.isEmpty()) {
            throw new EntityNotFoundException("Doctor not found :" + event.doctorId());
        }
        Doctor doctor = optionalDoctor.get();

        if (event.id() != null) {
            doctor.getAppointmentIds().remove(event.id());
        }

        doctorRepository.save(doctor);
    }

    public Long deleteDoctor(Long id) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
        if (optionalDoctor.isEmpty()) {
            throw new EntityNotFoundException("Doctor with ID " + id + " not found.");
        }
        Doctor doctor = optionalDoctor.get();

        doctorRepository.delete(doctor);
        return id;
    }
}
