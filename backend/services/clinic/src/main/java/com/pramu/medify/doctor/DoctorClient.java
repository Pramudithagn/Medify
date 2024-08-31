package com.pramu.medify.doctor;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "doctor-service")
public interface DoctorClient {

    @GetMapping("/api/v1/doctors/{id}")
    DoctorDTO getDoctorById(@PathVariable Long id);
}
