package com.pramu.medify.patient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(
        name = "patient-service",
        url = "${application.config.patient-url}"
)
public interface PatientClient {
    @GetMapping("/{id}")
    Optional<PatientDTO> getPatientById(@PathVariable("id") Long id);
}
