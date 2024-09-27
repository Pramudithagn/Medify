package com.pramu.medify.patient;

import com.pramu.medify.exception.BusinessException;
import com.pramu.medify.kafka.AppointmentCancelledEvent;
import com.pramu.medify.kafka.DoctorPatientAssignedEvent;
import com.pramu.medify.kafka.PatientKafkaProducer;
import jakarta.persistence.EntityNotFoundException;
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
    private final PatientKafkaProducer patientKafkaProducer;

    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(patientMapper::toDto)
                .collect(Collectors.toList());
    }

    public PatientDTO getPatientById(Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        return patient.map(patientMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with ID:: " + id));
    }

    public Patient createPatient(PatientDTO patientDTO) {
        Patient patient = patientMapper.toEntity(patientDTO);
        return patientRepository.save(patient);
    }

    public Patient updatePatient(PatientDTO patientDTO) {
        Optional<Patient> optionalPatient = patientRepository.findById(patientDTO.id());

        if (optionalPatient.isEmpty()) {
            throw new EntityNotFoundException("Patient with ID " + patientDTO.id() + " not found.");
        }
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
//            patient.getDoctorIds().addAll(patientDTO.doctorIds());
//            patient.setDoctorIds(patientDTO.doctorIds());
            if (patient.getDoctorIds().size() < patientDTO.doctorIds().size()) {
                for (Long doctorId : patientDTO.doctorIds()) {
                    if (!patient.getDoctorIds().contains(doctorId)) {
                        patientKafkaProducer.publishDoctorPatientAssignedEvent(new DoctorPatientAssignedEvent(
                                patientDTO.id(),
                                doctorId
                        ));
                    }
                }
                patient.setDoctorIds(patientDTO.doctorIds());
            }
            else {
                patient.getDoctorIds().removeAll(patientDTO.doctorIds());
            }
        }


        if (patientDTO.medicalRecordIds() != null) {
            patient.getMedicalRecordIds().addAll(patientDTO.medicalRecordIds());
        }
        if (patientDTO.appointmentIds() != null) {
            patient.getAppointmentIds().addAll(patientDTO.appointmentIds());
        }
        if (patientDTO.paymentIds() != null) {
//            patient.getPaymentIds().addAll(patientDTO.paymentIds());
            patient.setPaymentIds(patientDTO.paymentIds());
        }

        return patientRepository.save(patient);
    }

//    public void doctorPatientRemoveUpdate(PatientDTO patientDTO) {
//        Optional<Patient> optionalPatient = patientRepository.findById(patientDTO.id());
////        if (optionalPatient.isEmpty()) {
////            throw new EntityNotFoundException("Patient tried to remove has not found. ID :" + patientDTO.id());
////        }
//        Patient patient = optionalPatient.get();
//
//        if (patientDTO.doctorIds() != null) {
////            patient.getPatientIds().addAll(patientDTO.doctorIds());
//            patient.setDoctorIds(patientDTO.doctorIds());
//        }
//
//        patientRepository.save(patient);
//    }

    public void removeAppointment(AppointmentCancelledEvent event) {
        Optional<Patient> optionalPatient = patientRepository.findById(event.patientId());

        if (optionalPatient.isEmpty()) {
            throw new EntityNotFoundException("Patient not found :" + event.patientId());
        }
        Patient patient = optionalPatient.get();

        if (event.id() != null) {
            patient.getAppointmentIds().remove(event.id());
        }

        patientRepository.save(patient);

    }

    public PatientDTO assignDoctorToPatient(Long patientId, Long doctorId) {
        Optional<Patient> optionalPatient = patientRepository.findById(patientId);

        if (optionalPatient.isEmpty()) {
            throw new EntityNotFoundException("Patient tried to assign has not found. ID :" + patientId);
        }

        Patient patient = optionalPatient.get();

        if (patient.getDoctorIds().contains(doctorId)) {
            throw new BusinessException("The selected doctor already assigned to this patient. ID :" + doctorId);
        }
//        if (patient.getDoctorId() != null) {
//            throw new IllegalStateException("Patient already has a doctor assigned");
//        }

        Set<Long> newDoctorIds = patient.getDoctorIds();
        newDoctorIds.add(doctorId);
        patient.setDoctorIds(newDoctorIds);
        Patient updatedPatient = patientRepository.save(patient);

        patientKafkaProducer.publishDoctorPatientAssignedEvent(new DoctorPatientAssignedEvent(
                patientId,
                doctorId
        ));

        return patientMapper.toDto(updatedPatient);
    }

    public Long deletePatient(Long id) {
//        patientRepository.deleteById(id);
        Optional<Patient> optionalPatient = patientRepository.findById(id);
        if (optionalPatient.isEmpty()) {
            throw new EntityNotFoundException("Patient with ID " + id + " not found.");
        }
        Patient patient = optionalPatient.get();

        patientRepository.delete(patient);
        return id;
    }
}
