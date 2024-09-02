package com.pramu.medify.treatment;

import com.pramu.medify.treatment.TreatmentDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@FeignClient(
        name = "treatment-service",
        url = "${application.config.treatment-url}"
)
//@RequestMapping("/api/v1/treatments")
public interface TreatmentClient {

    @GetMapping("/{id}")
    Optional<TreatmentDTO> getTreatmentById(@PathVariable("id") Long id);
}
