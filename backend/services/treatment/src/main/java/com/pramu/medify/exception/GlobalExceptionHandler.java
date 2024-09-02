package com.pramu.medify.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(EntityNotFoundException.class)
//    public ResponseEntity<String> handle(EntityNotFoundException exp) {
//        return ResponseEntity
//                .status(HttpStatus.NOT_FOUND)
//                .body(exp.getMessage());
//    }
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> entityNotFoundException(EntityNotFoundException e, WebRequest request) {
        ErrorResponse errorDetails = new ErrorResponse(HttpStatus.NOT_FOUND, e.getMessage(), request.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

}