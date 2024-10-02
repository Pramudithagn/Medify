package com.pramu.medify.appointment;

import com.pramu.medify.doctor.DoctorDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        return new ResponseEntity<>(appointmentService.getAllAppointments(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Long id) {
        AppointmentDTO appointmentDTO = appointmentService.getAppointmentById(id);
//        if (appointmentDTO != null) {
            return new ResponseEntity<>(appointmentDTO, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByDoctorId(@PathVariable Long doctorId) {
//        List<AppointmentDTO> appointmentDTOs = appointmentService.getAppointmentByDoctorId(doctorId);
//        return new ResponseEntity<>(appointmentService.getAppointmentsByDoctorId(doctorId), HttpStatus.OK);
        return new ResponseEntity<>(appointmentService.getAppointmentsByUserId(doctorId, "doctor"), HttpStatus.OK);

    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByPatientId(@PathVariable Long patientId) {
        return new ResponseEntity<>(appointmentService.getAppointmentsByUserId(patientId, "patient"), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
//        try {
            return new ResponseEntity<>(appointmentService.createAppointment(appointmentDTO), HttpStatus.CREATED);
//        } catch (IllegalArgumentException e) {
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }
    }

    @PutMapping("/edit")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody AppointmentDTO appointmentDTO) {
//        try {
            Appointment updatedAppointment = appointmentService.updateAppointment(appointmentDTO);
//            if (updatedAppointment != null) {
                return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
//            }
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        } catch (IllegalArgumentException e) {
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deleteAppointment(@PathVariable Long id) {
        return new ResponseEntity<>(appointmentService.deleteAppointment(id), HttpStatus.OK);
    }
}
