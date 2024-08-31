package com.pramu.medify.patient;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientDTO>> getAllPatients() {
        return new ResponseEntity<>(patientService.getAllPatients(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable Long id) {
        PatientDTO patientDTO = patientService.getPatientById(id);
        if (patientDTO != null) {
            return new ResponseEntity<>(patientDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody PatientDTO patientDTO) {
        return new ResponseEntity<>(patientService.createPatient(patientDTO), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Patient> updatePatient(@RequestBody PatientDTO patientDTO) {
        Patient updatedPatient = patientService.updatePatient(patientDTO);
        if (updatedPatient != null) {
            return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{patientId}/assign-doctor/{doctorId}")
    public ResponseEntity<PatientDTO> assignDoctorToPatient(@PathVariable Long patientId, @PathVariable Long doctorId) {
        try {
            return new ResponseEntity<>(patientService.assignDoctorToPatient(patientId, doctorId), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
//        catch (IllegalStateException e) {
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deletePatient(@PathVariable Long id) {
        Long delId= patientService.deletePatient(id);
        return new ResponseEntity<>(delId, HttpStatus.OK);
    }
}
