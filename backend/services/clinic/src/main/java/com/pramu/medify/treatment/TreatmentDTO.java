package com.pramu.medify.treatment;

import java.math.BigDecimal;
import java.util.Set;

public record TreatmentDTO(
        Long id,
        String name,
        String description,
        BigDecimal price,
        Boolean status,
        Set<Long> doctorIds
) {
}
