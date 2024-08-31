package com.pramu.medify.patient;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(patientMapper::toDto)
                .collect(Collectors.toList());
    }

    public PatientDTO getPatientById(Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        return patient.map(patientMapper::toDto).orElse(null);
    }

    public Patient createPatient(PatientDTO patientDTO) {
        Patient patient = patientMapper.toEntity(patientDTO);
        Patient savedPatient = patientRepository.save(patient);
        return savedPatient;
    }

    public Patient updatePatient(PatientDTO patientDTO) {
        Optional<Patient> optionalPatient = patientRepository.findById(patientDTO.id());
        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();
            if (patientDTO.name() != null) {
                patient.setName(patientDTO.name());
            }
            if (patientDTO.mail() != null) {
                patient.setMail(patientDTO.mail());
            }
            if (patientDTO.phone() != null) {
                patient.setPhone(patientDTO.phone());
            }
            if (patientDTO.photo() != null) {
                patient.setPhoto(patientDTO.photo());
            }
            if (patientDTO.gender() != null) {
                patient.setGender(patientDTO.gender());
            }
            if (patientDTO.dob() != null) {
                patient.setDob(patientDTO.dob());
            }
            if (patientDTO.address() != null) {
                patient.setAddress(patientDTO.address());
            }
            if (patientDTO.assignedDate() != null) {
                patient.setAssignedDate(patientDTO.assignedDate());
            }
            if (patientDTO.bloodGroup() != null) {
                patient.setBloodGroup(patientDTO.bloodGroup());
            }
            if (patientDTO.age() != null) {
                patient.setAge(patientDTO.age());
            }
            if (patientDTO.weight() != null) {
                patient.setWeight(patientDTO.weight());
            }
            if (patientDTO.height() != null) {
                patient.setHeight(patientDTO.height());
            }
            if (patientDTO.allergies() != null) {
                patient.setAllergies(patientDTO.allergies());
            }
            if (patientDTO.doctorIds() != null) {
                patient.setDoctorIds(patientDTO.doctorIds());
            }
            if (patientDTO.medicalRecordIds() != null) {
                patient.setMedicalRecordIds(patientDTO.medicalRecordIds());
            }
            if (patientDTO.appointmentIds() != null) {
                patient.setAppointmentIds(patientDTO.appointmentIds());
            }
            if (patientDTO.paymentIds() != null) {
                patient.setPaymentIds(patientDTO.paymentIds());
            }

            Patient updatedPatient = patientRepository.save(patient);
            return updatedPatient;
        }
        return null;
    }

    public PatientDTO assignDoctorToPatient(Long patientId, Long doctorId) {
        Optional<Patient> patientOptional = patientRepository.findById(patientId);
        if (patientOptional.isEmpty()) {
            throw new IllegalArgumentException("Patient not found");
        }

        Patient patient = patientOptional.get();

//        if (patient.getDoctorId() != null) {
//            throw new IllegalStateException("Patient already has a doctor assigned");
//        }

        Set<Long> newDoctorIds = patient.getDoctorIds();
        newDoctorIds.add(doctorId);
        patient.setDoctorIds(newDoctorIds);
        Patient updatedPatient = patientRepository.save(patient);

        return patientMapper.toDto(updatedPatient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
