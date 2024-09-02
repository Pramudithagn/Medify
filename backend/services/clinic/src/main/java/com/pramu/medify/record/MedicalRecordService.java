package com.pramu.medify.record;

import com.pramu.medify.doctor.DoctorClient;
import com.pramu.medify.exception.BusinessException;
import com.pramu.medify.exception.ResourceNotFoundException;
import com.pramu.medify.kafka.AppointmentCreatedEvent;
import com.pramu.medify.kafka.ClinicKafkaProducer;
import com.pramu.medify.kafka.MedicalRecordCreatedEvent;
import com.pramu.medify.patient.PatientClient;
import com.pramu.medify.treatment.TreatmentClient;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordMapper medicalRecordMapper;
    private final DoctorClient doctorClient;
    private final PatientClient patientClient;
    private final TreatmentClient treatmentClient;
    private final ClinicKafkaProducer clinicKafkaProducer;

    public List<MedicalRecordDTO> getAllMedicalRecords() {
        return medicalRecordRepository.findAll().stream()
                .map(medicalRecordMapper::toDto)
                .collect(Collectors.toList());
    }

    public MedicalRecordDTO getMedicalRecordById(Long id) {
        Optional<MedicalRecord> medicalRecord = medicalRecordRepository.findById(id);
        return medicalRecord.map(medicalRecordMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("MedicalRecord not found with id " + id));
    }

    public MedicalRecord createMedicalRecord(MedicalRecordDTO medicalRecordDTO) {
        // Validate if Doctor and Patient exist
        doctorClient.getDoctorById(medicalRecordDTO.doctorId())
                .orElseThrow(() -> new BusinessException("Can't create medical record:: No doctor exists with the provided ID!"));;
        patientClient.getPatientById(medicalRecordDTO.patientId())
                .orElseThrow(() -> new BusinessException("Can't create medical record:: No patient exists with the provided ID!"));;

        // Validate Treatments exist
        List<Long> treatmentIds = medicalRecordDTO.treatmentIds();
        treatmentIds.forEach(treatmentId -> treatmentClient.getTreatmentById(treatmentId)
                .orElseThrow(() -> new BusinessException("Can't create medical record:: Treatment with ID: " + treatmentId + "isn't available!"))
        );

        MedicalRecord medicalRecord = medicalRecordMapper.toEntity(medicalRecordDTO);
        MedicalRecord savedMedicalRecord = medicalRecordRepository.save(medicalRecord);

        clinicKafkaProducer.publishMedicalRecordCreatedEvent(new MedicalRecordCreatedEvent(
                savedMedicalRecord.getId(),
                savedMedicalRecord.getPatientId(),
                savedMedicalRecord.getDoctorId()
        ));

        return savedMedicalRecord;
    }

    public MedicalRecord updateMedicalRecord(MedicalRecordDTO medicalRecordDTO) {
        Optional<MedicalRecord> optionalMedicalRecord = medicalRecordRepository.findById(medicalRecordDTO.id());

        if (optionalMedicalRecord.isEmpty()) {
            throw new ResourceNotFoundException("Medical record with ID " + medicalRecordDTO.id() + " not found.");
        }

        MedicalRecord medicalRecord = optionalMedicalRecord.get();

        if (medicalRecordDTO.diagnosis() != null) {
            medicalRecord.setDiagnosis(medicalRecordDTO.diagnosis());
        }
        if (medicalRecordDTO.prescription() != null) {
            medicalRecord.setPrescription(medicalRecordDTO.prescription());
        }
        if (medicalRecordDTO.treatmentIds() != null) {
            // Validate Treatments exist
            List<Long> treatmentIds = medicalRecordDTO.treatmentIds();
            treatmentIds.forEach(treatmentId -> treatmentClient.getTreatmentById(treatmentId)
                    .orElseThrow(() -> new BusinessException("Can't create medical record:: Treatment with ID: " + treatmentId + "isn't available!"))
            );
            medicalRecord.setTreatmentIds(treatmentIds);
        }
        if (medicalRecordDTO.doctorId() != null) {
            // Validate Doctor exists
            doctorClient.getDoctorById(medicalRecordDTO.doctorId())
                    .orElseThrow(() -> new BusinessException("Can't update medical record:: No doctor exists with the provided ID!"));;;
            medicalRecord.setDoctorId(medicalRecordDTO.doctorId());
        }
        if (medicalRecordDTO.patientId() != null) {
            // Validate Patient exists
            patientClient.getPatientById(medicalRecordDTO.patientId())
                    .orElseThrow(() -> new BusinessException("Can't update medical record:: No patient exists with the provided ID!"));
            medicalRecord.setPatientId(medicalRecordDTO.patientId());
        }

        return medicalRecordRepository.save(medicalRecord);
    }

    public void deleteMedicalRecord(Long id) {
//        medicalRecordRepository.deleteById(id);
        MedicalRecord medicalRecord = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord not found with id " + id));
        medicalRecordRepository.delete(medicalRecord);
    }
}
