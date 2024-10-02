package com.pramu.medify.record;

import com.pramu.medify.appointment.AppointmentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/medical-records")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @GetMapping
    public ResponseEntity<List<MedicalRecordDTO>> getAllMedicalRecords() {
        return new ResponseEntity<>(medicalRecordService.getAllMedicalRecords(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordDTO> getMedicalRecordById(@PathVariable Long id) {
        MedicalRecordDTO medicalRecordDTO = medicalRecordService.getMedicalRecordById(id);
//        if (medicalRecordDTO != null) {
            return new ResponseEntity<>(medicalRecordDTO, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalRecordDTO>> getMedicalRecordsByDoctorId(@PathVariable Long doctorId) {
        return new ResponseEntity<>(medicalRecordService.getMedicalRecordsByUserId(doctorId, "doctor"), HttpStatus.OK);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecordDTO>> getMedicalRecordsByPatientId(@PathVariable Long patientId) {
        return new ResponseEntity<>(medicalRecordService.getMedicalRecordsByUserId(patientId, "patient"), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<MedicalRecord> createMedicalRecord(@RequestBody MedicalRecordDTO medicalRecordDTO) {
        return new ResponseEntity<>(medicalRecordService.createMedicalRecord(medicalRecordDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit")
    public ResponseEntity<MedicalRecord> updateMedicalRecord(@RequestBody MedicalRecordDTO medicalRecordDTO) {
        MedicalRecord updatedMedicalRecord = medicalRecordService.updateMedicalRecord(medicalRecordDTO);
//        if (updatedMedicalRecord != null) {
            return new ResponseEntity<>(updatedMedicalRecord, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deleteMedicalRecord(@PathVariable Long id) {

        return new ResponseEntity<>(medicalRecordService.deleteMedicalRecord(id), HttpStatus.OK);
    }
}
