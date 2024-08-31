package com.pramu.medify.patient;

import com.pramu.medify.patient.PatientDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(name = "patient-service")
//@RequestMapping("/api/v1/patients")
public interface PatientClient {

    @GetMapping("/api/v1/patients/{id}")
    PatientDTO getPatientById(@PathVariable("id") Long id);
}
