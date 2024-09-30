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
            return new ResponseEntity<>(patientDTO, HttpStatus.OK);
    }

    @GetMapping("/uuid/{uuid}")
    public ResponseEntity<PatientDTO> getPatientByUuid(@PathVariable String uuid) {
        PatientDTO patientDTO = patientService.getPatientByUuid(uuid);
        return new ResponseEntity<>(patientDTO, HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<Patient> createPatient(@RequestBody PatientDTO patientDTO) {
        return new ResponseEntity<>(patientService.createPatient(patientDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit")
    public ResponseEntity<Patient> updatePatient(@RequestBody PatientDTO patientDTO) {
        Patient updatedPatient = patientService.updatePatient(patientDTO);
            return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
    }

    @PutMapping("/edit/{patientId}/assign-doctor/{doctorId}")
    public ResponseEntity<PatientDTO> assignDoctorToPatient(@PathVariable Long patientId, @PathVariable Long doctorId) {
            return new ResponseEntity<>(patientService.assignDoctorToPatient(patientId, doctorId), HttpStatus.OK);
        }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deletePatient(@PathVariable Long id) {
        return new ResponseEntity<>(patientService.deletePatient(id), HttpStatus.OK);
    }
}
