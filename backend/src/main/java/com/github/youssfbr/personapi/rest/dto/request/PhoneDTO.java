package com.github.youssfbr.personapi.rest.dto.request;

import com.github.youssfbr.personapi.model.entities.enums.PhoneType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PhoneDTO {

    private Long id;

  //  @NotNull(message = "{phoneNumber.required}")
    @Enumerated(EnumType.STRING)
    private PhoneType type;

  //  @NotEmpty(message = "{phoneNumber.required}")
    @Size(min = 8, max = 20, message = "{phoneNumber.size}")
    private String number;
}
