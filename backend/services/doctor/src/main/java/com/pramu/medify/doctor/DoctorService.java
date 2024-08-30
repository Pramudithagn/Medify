package com.pramu.medify.doctor;

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

    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(doctorMapper::toDto)
                .collect(Collectors.toList());
    }

    public DoctorDTO getDoctorById(Long id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        return doctor.map(doctorMapper::toDto).orElse(null);
    }

    public Doctor createDoctor(DoctorDTO doctorDTO) {
        Doctor doctor = doctorMapper.toEntity(doctorDTO);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return savedDoctor;
    }

    public Doctor updateDoctor(DoctorDTO doctorDTO) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorDTO.id());
        if (optionalDoctor.isPresent()) {
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
            if (doctorDTO.address() != null) {
                doctor.setAddress(doctorDTO.address());
            }
            if (doctorDTO.specialization() != null) {
                doctor.setSpecialization(doctorDTO.specialization());
            }
            if (doctorDTO.patientIds() != null) {
                doctor.setPatientIds(doctorDTO.patientIds());
            }
            if (doctorDTO.medicalRecordIds() != null) {
                doctor.setMedicalRecordIds(doctorDTO.medicalRecordIds());
            }
            if (doctorDTO.appointmentIds() != null) {
                doctor.setAppointmentIds(doctorDTO.appointmentIds());
            }
            if (doctorDTO.treatmentIds() != null) {
                doctor.setTreatmentIds(doctorDTO.treatmentIds());
            }

            Doctor updatedDoctor = doctorRepository.save(doctor);
            return updatedDoctor;
        }
        return null;
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
