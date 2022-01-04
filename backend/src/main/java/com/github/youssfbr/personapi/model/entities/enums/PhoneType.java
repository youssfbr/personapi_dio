package com.github.youssfbr.personapi.model.entities.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PhoneType {

    RESIDENCIAL("Residencial"),
    CELULAR("Celular"),
    COMERCIAL("Comercial");

    private final String description;
}
