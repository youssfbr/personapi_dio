package com.github.youssfbr.personapi.model.entities;

import com.github.youssfbr.personapi.model.entities.enums.PhoneType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Phone {

    private Long id;

    private PhoneType type;

    private String number;
}
