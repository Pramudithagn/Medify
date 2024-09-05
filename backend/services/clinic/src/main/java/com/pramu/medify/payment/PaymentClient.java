package com.pramu.medify.payment;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@FeignClient(
        name = "payment-service",
        url = "${application.config.payment-url}"
)
public interface PaymentClient {

    @PostMapping()
    Optional<PaymentDTO> createPayment(PaymentDTO paymentDTO);
}
