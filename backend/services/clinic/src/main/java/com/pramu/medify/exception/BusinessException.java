package com.pramu.medify.exception;

public class BusinessException extends RuntimeException {
    //    private final String msg;

    public BusinessException(String message) {
        super(message);
    }
}
