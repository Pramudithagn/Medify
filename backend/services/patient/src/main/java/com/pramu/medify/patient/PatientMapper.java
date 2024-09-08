package com.pramu.medify.patient;

import org.springframework.stereotype.Component;

@Component
public class PatientMapper {

    public PatientDTO toDto(Patient patient) {
        return new PatientDTO(
                patient.getId(),
                patient.getUuid(),
                patient.getName(),
                patient.getMail(),
                patient.getPhone(),
                patient.getPhoto(),
                patient.getGender(),
                patient.getDob(),
                patient.getAddress(),
                patient.getAssignedDate(),
                patient.getBloodGroup(),
                patient.getAge(),
                patient.getWeight(),
                patient.getHeight(),
                patient.getAllergies(),
                patient.getDoctorIds(),
                patient.getMedicalRecordIds(),
                patient.getAppointmentIds(),
                patient.getPaymentIds()
        );
    }

    public Patient toEntity(PatientDTO dto) {
        return Patient.builder()
                .uuid(dto.uuid())
                .name(dto.name())
                .mail(dto.mail())
                .phone(dto.phone())
                .photo(dto.photo())
                .gender(dto.gender())
                .dob(dto.dob())
                .address(dto.address())
                .assignedDate(dto.assignedDate())
                .bloodGroup(dto.bloodGroup())
                .age(dto.age())
                .weight(dto.weight())
                .height(dto.height())
                .allergies(dto.allergies())
                .doctorIds(dto.doctorIds())
                .medicalRecordIds(dto.medicalRecordIds())
                .appointmentIds(dto.appointmentIds())
                .paymentIds(dto.paymentIds())
                .build();
    }
}
