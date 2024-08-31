package com.pramu.medify.treatment;

import com.pramu.medify.treatment.TreatmentDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(name = "treatment-service")
@RequestMapping("/api/v1/treatments")
public interface TreatmentClient {

    @GetMapping("/{id}")
    TreatmentDTO getTreatmentById(@PathVariable("id") Long id);
}
