package com.pramu.medify.patient;

public record PatientDTO(
        Long id,
        String name,
        String mail,
        String phone,
        String photo,
        String gender,
        String dob,
        String address,
        String bloodGroup,
        Integer age,
        Double weight,
        Double height,
        String allergies
) {
}
