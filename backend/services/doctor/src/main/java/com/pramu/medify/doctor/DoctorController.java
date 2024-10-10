package com.pramu.medify.doctor;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        return new ResponseEntity<>(doctorService.getAllDoctors(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable Long id) {
        DoctorDTO doctorDTO = doctorService.getDoctorById(id);
            return new ResponseEntity<>(doctorDTO, HttpStatus.OK);
    }

    @GetMapping("/uuid/{uuid}")
    public ResponseEntity<DoctorDTO> getDoctorByUuid(@PathVariable String uuid) {
        DoctorDTO doctorDTO = doctorService.getDoctorByUuid(uuid);
        return new ResponseEntity<>(doctorDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorDTO doctorDTO) {
        return new ResponseEntity<>(doctorService.createDoctor(doctorDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit")
    public ResponseEntity<Doctor> updateDoctor(@RequestBody DoctorDTO doctorDTO) {
        Doctor updatedDoctor = doctorService.updateDoctor(doctorDTO);
            return new ResponseEntity<>(updatedDoctor, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deleteDoctor(@PathVariable Long id) {
        return new ResponseEntity<>(doctorService.deleteDoctor(id), HttpStatus.OK);
    }
}
