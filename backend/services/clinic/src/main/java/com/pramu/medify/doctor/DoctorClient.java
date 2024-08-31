package com.pramu.medify.doctor;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "doctor-service",
        url = "${application.config.doctor-url}"
)
public interface DoctorClient {

    @GetMapping("/{id}")
    DoctorDTO getDoctorById(@PathVariable("id")  Long id);
}
