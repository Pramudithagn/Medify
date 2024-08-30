package com.pramu.medify.treatment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/treatments")
@RequiredArgsConstructor
public class TreatmentController {

    private final TreatmentService treatmentService;

    @GetMapping
    public ResponseEntity<List<TreatmentDTO>> getAllTreatments() {
        return new ResponseEntity<>(treatmentService.getAllTreatments(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreatmentDTO> getTreatmentById(@PathVariable Long id) {
        TreatmentDTO treatmentDTO = treatmentService.getTreatmentById(id);
        if (treatmentDTO != null) {
            return new ResponseEntity<>(treatmentDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Treatment> createTreatment(@RequestBody TreatmentDTO treatmentDTO) {
        return new ResponseEntity<>(treatmentService.createTreatment(treatmentDTO), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Treatment> updateTreatment(@RequestBody TreatmentDTO treatmentDTO) {
        Treatment updatedTreatment = treatmentService.updateTreatment(treatmentDTO);
        if (updatedTreatment != null) {
            return new ResponseEntity<>(updatedTreatment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTreatment(@PathVariable Long id) {
        treatmentService.deleteTreatment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
