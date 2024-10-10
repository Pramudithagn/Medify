package com.pramu.medify.payment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        return new ResponseEntity<>(paymentService.getAllPayments(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable Long id) {
        PaymentDTO paymentDTO = paymentService.getPaymentById(id);
            return new ResponseEntity<>(paymentDTO, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByUserId(@PathVariable Long userId) {
        return new ResponseEntity<>(paymentService.getPaymentsByUserId(userId), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentDTO paymentDTO) {
        return new ResponseEntity<>(paymentService.createPayment(paymentDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit")
    public ResponseEntity<Payment> updatePayment(@RequestBody PaymentDTO paymentDTO) {
        Payment updatedPayment = paymentService.updatePayment(paymentDTO);
            return new ResponseEntity<>(updatedPayment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deletePayment(@PathVariable Long id) {
        return new ResponseEntity<>(paymentService.deletePayment(id), HttpStatus.OK);
    }
}
