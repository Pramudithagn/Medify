package com.pramu.medify.record;

import org.springframework.stereotype.Component;

@Component
public class MedicalRecordMapper {

    public MedicalRecordDTO toDto(MedicalRecord medicalRecord) {
        return new MedicalRecordDTO(
                medicalRecord.getId(),
                medicalRecord.getDiagnosis(),
                medicalRecord.getPrescription(),
                medicalRecord.getTreatmentIds(),
                medicalRecord.getDoctorId(),
                medicalRecord.getPatientId()
        );
    }

    public MedicalRecord toEntity(MedicalRecordDTO dto) {
        return MedicalRecord.builder()
                .diagnosis(dto.diagnosis())
                .prescription(dto.prescription())
                .treatmentIds(dto.treatmentIds())
                .doctorId(dto.doctorId())
                .patientId(dto.patientId())
                .build();
    }
}
