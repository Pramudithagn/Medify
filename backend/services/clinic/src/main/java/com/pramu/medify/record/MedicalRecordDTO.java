package com.pramu.medify.record;

import java.util.List;

public record MedicalRecordDTO(
        Long id,
        String diagnosis,
        String prescription,
        List<Long> treatmentIds,
        Long doctorId,
        Long patientId
) {
}
