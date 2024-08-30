package com.pramu.medify.treatment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TreatmentService {

    private final TreatmentRepository treatmentRepository;

    private final TreatmentMapper treatmentMapper;


    public List<TreatmentDTO> getAllTreatments() {
        return treatmentRepository.findAll().stream()
                .map(treatmentMapper::toDto)
                .collect(Collectors.toList());
    }

    public TreatmentDTO getTreatmentById(Long id) {
        Optional<Treatment> treatment = treatmentRepository.findById(id);
        return treatment.map(treatmentMapper::toDto).orElse(null);
    }

    public Treatment createTreatment(TreatmentDTO treatmentDTO) {
        Treatment treatment = treatmentMapper.toEntity(treatmentDTO);
        Treatment savedTreatment = treatmentRepository.save(treatment);
        return savedTreatment;
    }

    public Treatment updateTreatment(TreatmentDTO treatmentDTO) {
        Optional<Treatment> optionalTreatment = treatmentRepository.findById(treatmentDTO.id());
        if (optionalTreatment.isPresent()) {
            Treatment treatment = optionalTreatment.get();
//            treatment.setName(treatmentDTO.name());
//            treatment.setDescription(treatmentDTO.description());
//            treatment.setPrice(treatmentDTO.price());
//            treatment.setStatus(treatmentDTO.status());
//            treatment.setDoctorIds(treatmentDTO.doctorIds());

            if (treatmentDTO.name() != null) {
                treatment.setName(treatmentDTO.name());
            }
            if (treatmentDTO.description() != null) {
                treatment.setDescription(treatmentDTO.description());
            }
            if (treatmentDTO.price() != null) {
                treatment.setPrice(treatmentDTO.price());
            }
            if (treatmentDTO.status() != null) {
                treatment.setStatus(treatmentDTO.status());
            }
            if (treatmentDTO.doctorIds() != null) {
                treatment.setDoctorIds(treatmentDTO.doctorIds());
            }

            Treatment updatedTreatment = treatmentRepository.save(treatment);
            return updatedTreatment;
        }
        return null;
    }

    public void deleteTreatment(Long id) {
        treatmentRepository.deleteById(id);
    }

//    private TreatmentDTO convertToDTO(Treatment treatment) {
//        TreatmentDTO dto = new TreatmentDTO();
//        dto.setId(treatment.getId());
//        dto.setName(treatment.getName());
//        dto.setPrice(treatment.getPrice());
//        dto.setStatus(treatment.getStatus());
//        dto.setDoctorIds(treatment.getDoctorIds());
//        return dto;
//    }
//
//    private Treatment convertToEntity(TreatmentDTO dto) {
//        Treatment treatment = new Treatment();
//        treatment.setId(dto.getId());
//        treatment.setName(dto.getName());
//        treatment.setPrice(dto.getPrice());
//        treatment.setStatus(dto.getStatus());
//        treatment.setDoctorIds(dto.getDoctorIds());
//        return treatment;
//    }


}
