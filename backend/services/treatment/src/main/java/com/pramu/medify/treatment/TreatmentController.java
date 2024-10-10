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
            return new ResponseEntity<>(treatmentDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Treatment> createTreatment(@RequestBody TreatmentDTO treatmentDTO) {
        return new ResponseEntity<>(treatmentService.createTreatment(treatmentDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit")
    public ResponseEntity<Treatment> updateTreatment(@RequestBody TreatmentDTO treatmentDTO) {
        Treatment updatedTreatment = treatmentService.updateTreatment(treatmentDTO);
            return new ResponseEntity<>(updatedTreatment, HttpStatus.OK);
    }

    @PutMapping("/edit/change-status/{id}")
    public Treatment changeStatus(@PathVariable Long id) {
        return treatmentService.changeStatus(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deleteTreatment(@PathVariable Long id) {
        return new ResponseEntity<>(treatmentService.deleteTreatment(id), HttpStatus.OK);
    }
}
