package com.pramu.medify.treatment;
import org.springframework.stereotype.Component;

@Component
public class TreatmentMapper {

    public TreatmentDTO toDto(Treatment treatment) {
        if (treatment == null) {
            return null;
        }
        return new TreatmentDTO(
                treatment.getId(),
                treatment.getName(),
                treatment.getDescription(),
                treatment.getPrice(),
                treatment.getStatus(),
                treatment.getDoctorIds()
        );
    }

    public Treatment toEntity(TreatmentDTO dto) {
        if (dto == null) {
            return null;
        }
        return Treatment.builder()
                .name(dto.name())
                .description(dto.description())
                .price(dto.price())
                .status(dto.status())
                .doctorIds(dto.doctorIds())
                .build();
    }
}
