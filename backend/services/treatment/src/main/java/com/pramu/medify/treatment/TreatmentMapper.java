package com.pramu.medify.treatment;
import org.springframework.stereotype.Component;

@Component
public class TreatmentMapper {

    // Converts Treatment entity to TreatmentDTO
    public TreatmentDTO toDto(Treatment treatment) {
        return new TreatmentDTO(
                treatment.getId(),
                treatment.getName(),
                treatment.getDescription(),
                treatment.getPrice(),
                treatment.getStatus(),
                treatment.getDoctorIds()
        );
    }

    // Converts TreatmentDTO to Treatment entity
    public Treatment toEntity(TreatmentDTO dto) {
        return Treatment.builder()
                .name(dto.name())
                .description(dto.description())
                .price(dto.price())
                .status(dto.status())
                .doctorIds(dto.doctorIds())
                .build();
    }
}
