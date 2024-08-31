package com.pramu.medify.patient;

import com.pramu.medify.doctor.Address;

public record PatientDTO(
        Long id,
        String name,
        String mail,
        String phone,
        String photo,
        String gender,
        String dob,
        Address address,
        String bloodGroup,
        Integer age,
        Double weight,
        Double height,
        String allergies
) {
}
