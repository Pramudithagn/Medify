package com.pramu.medify.treatment;

import com.pramu.medify.kafka.AssignedDoctorsChangedEvent;
import com.pramu.medify.kafka.TreatmentKafkaProducer;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TreatmentService {

    private final TreatmentRepository treatmentRepository;
    private final TreatmentMapper treatmentMapper;
    private final TreatmentKafkaProducer treatmentKafkaProducer;

    public List<TreatmentDTO> getAllTreatments() {
        return treatmentRepository.findAll().stream()
                .map(treatmentMapper::toDto)
                .collect(Collectors.toList());
    }

    public TreatmentDTO getTreatmentById(Long id) {
        Optional<Treatment> treatment = treatmentRepository.findById(id);
        return treatment.map(treatmentMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Treatment not found with ID:: " + id));
    }

    public Treatment createTreatment(TreatmentDTO treatmentDTO) {
        Treatment treatment = treatmentMapper.toEntity(treatmentDTO);
        Treatment savedTreatment = treatmentRepository.save(treatment);

        Set<Long> doctorIds = new HashSet<>(treatmentDTO.doctorIds());

        treatmentKafkaProducer.assignedDoctorsChangedEvent(new AssignedDoctorsChangedEvent(
                savedTreatment.getId(),
                doctorIds
        ));
        return savedTreatment;
    };

    public Treatment updateTreatment(TreatmentDTO treatmentDTO) {
        Optional<Treatment> optionalTreatment = treatmentRepository.findById(treatmentDTO.id());

        if (optionalTreatment.isEmpty()) {
            throw new EntityNotFoundException("Treatment with ID " + treatmentDTO.id() + " not found.");
        }
        Treatment treatment = optionalTreatment.get();

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
            Set<Long> doctorIds = new HashSet<>(treatmentDTO.doctorIds());

            treatmentKafkaProducer.assignedDoctorsChangedEvent(new AssignedDoctorsChangedEvent(
                    treatmentDTO.id(),
                    doctorIds
            ));
            for (Long doctorId : treatmentDTO.doctorIds()) {
                if (treatment.getDoctorIds().contains(doctorId)) {
                    treatment.getDoctorIds().remove(doctorId);
                } else {
                    treatment.getDoctorIds().add(doctorId);
                }
            }
        }

        return treatmentRepository.save(treatment);
    }

    @Transactional
    public Treatment changeStatus(Long id) {
        Treatment treatment = treatmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Treatment not found.."));
        treatment.setStatus(!treatment.getStatus());
        return treatmentRepository.save(treatment);
    }

    public Long deleteTreatment(Long id) {
        Optional<Treatment> optionalTreatment = treatmentRepository.findById(id);
        if (optionalTreatment.isEmpty()) {
            throw new EntityNotFoundException("Treatment with ID " + id + " not found.");
        }
        Treatment doctor = optionalTreatment.get();

        treatmentRepository.delete(doctor);
        return id;
    }

}
