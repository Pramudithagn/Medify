package com.pramu.medify.doctor;

import org.springframework.stereotype.Component;

@Component
public class DoctorMapper {

    public DoctorDTO toDto(Doctor doctor) {
        if (doctor == null) {
            return null;
        }
        return new DoctorDTO(
                doctor.getId(),
                doctor.getName(),
                doctor.getMail(),
                doctor.getPhone(),
                doctor.getPhoto(),
                doctor.getAddress(),
                doctor.getSpecialization(),
                doctor.getPatientIds(),
                doctor.getMedicalRecordIds(),
                doctor.getAppointmentIds(),
                doctor.getTreatmentIds()
        );
    }

    public Doctor toEntity(DoctorDTO dto) {
        if (dto == null) {
            return null;
        }
        return Doctor.builder()
                .name(dto.name())
                .mail(dto.mail())
                .phone(dto.phone())
                .photo(dto.photo())
                .address(dto.address())
                .specialization(dto.specialization())
                .patientIds(dto.patientIds())
                .medicalRecordIds(dto.medicalRecordIds())
                .appointmentIds(dto.appointmentIds())
                .treatmentIds(dto.treatmentIds())
                .build();
    }
}
