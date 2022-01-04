package com.github.youssfbr.personapi.services.exceptions;

import lombok.Getter;

@Getter
public class CpfExistsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public CpfExistsException(final String message) {
        super(message);
    }
}
