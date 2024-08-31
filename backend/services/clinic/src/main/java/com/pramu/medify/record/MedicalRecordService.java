package com.pramu.medify.record;

import com.pramu.medify.doctor.DoctorClient;
import com.pramu.medify.patient.PatientClient;
import com.pramu.medify.treatment.TreatmentClient;
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

    public List<MedicalRecordDTO> getAllMedicalRecords() {
        return medicalRecordRepository.findAll().stream()
                .map(medicalRecordMapper::toDto)
                .collect(Collectors.toList());
    }

    public MedicalRecordDTO getMedicalRecordById(Long id) {
        Optional<MedicalRecord> medicalRecord = medicalRecordRepository.findById(id);
        return medicalRecord.map(medicalRecordMapper::toDto).orElse(null);
    }

    public MedicalRecord createMedicalRecord(MedicalRecordDTO medicalRecordDTO) {
        // Validate if Doctor and Patient exist
        doctorClient.getDoctorById(medicalRecordDTO.doctorId());
        patientClient.getPatientById(medicalRecordDTO.patientId());

        // Validate Treatments exist
        List<Long> treatmentIds = medicalRecordDTO.treatmentIds();
        treatmentIds.forEach(treatmentId -> treatmentClient.getTreatmentById(treatmentId));

        MedicalRecord medicalRecord = medicalRecordMapper.toEntity(medicalRecordDTO);
        return medicalRecordRepository.save(medicalRecord);
    }

    public MedicalRecord updateMedicalRecord(MedicalRecordDTO medicalRecordDTO) {
        Optional<MedicalRecord> optionalMedicalRecord = medicalRecordRepository.findById(medicalRecordDTO.id());
        if (optionalMedicalRecord.isPresent()) {
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
                treatmentIds.forEach(treatmentId -> treatmentClient.getTreatmentById(treatmentId));
                medicalRecord.setTreatmentIds(treatmentIds);
            }
            if (medicalRecordDTO.doctorId() != null) {
                // Validate Doctor exists
                doctorClient.getDoctorById(medicalRecordDTO.doctorId());
                medicalRecord.setDoctorId(medicalRecordDTO.doctorId());
            }
            if (medicalRecordDTO.patientId() != null) {
                // Validate Patient exists
                patientClient.getPatientById(medicalRecordDTO.patientId());
                medicalRecord.setPatientId(medicalRecordDTO.patientId());
            }

            return medicalRecordRepository.save(medicalRecord);
        }
        return null;
    }

    public void deleteMedicalRecord(Long id) {
        medicalRecordRepository.deleteById(id);
    }
}
