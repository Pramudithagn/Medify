package com.pramu.medify.record;

import org.springframework.stereotype.Component;

@Component
public class MedicalRecordMapper {

    public MedicalRecordDTO toDto(MedicalRecord medicalRecord) {
        return new MedicalRecordDTO(
                medicalRecord.getId(),
                medicalRecord.getDiagnosis(),
                medicalRecord.getPrescription(),
                medicalRecord.getAssignDate(),
                medicalRecord.getPrice(),
                medicalRecord.getTreatmentIds(),
                medicalRecord.getDoctorId(),
                medicalRecord.getPatientId(),
                medicalRecord.getPaymentId()
        );
    }

    public MedicalRecord toEntity(MedicalRecordDTO dto) {
        return MedicalRecord.builder()
                .diagnosis(dto.diagnosis())
                .prescription(dto.prescription())
                .assignDate(dto.assignDate())
                .price(dto.price())
                .treatmentIds(dto.treatmentIds())
                .doctorId(dto.doctorId())
                .patientId(dto.patientId())
                .paymentId(dto.paymentId())
                .build();
    }
}
