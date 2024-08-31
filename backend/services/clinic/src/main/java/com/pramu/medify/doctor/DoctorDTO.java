package com.pramu.medify.doctor;

public record DoctorDTO(
        Long id,
        String name,
        String mail,
        String phone,
        String photo,
        String address,
        String specialization
) {
}
