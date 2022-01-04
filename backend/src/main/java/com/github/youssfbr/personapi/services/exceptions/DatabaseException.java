package com.github.youssfbr.personapi.services.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class DatabaseException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private final HttpStatus httpStatus;

    public DatabaseException(final String message, final HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
