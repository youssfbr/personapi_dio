package com.github.youssfbr.personapi.rest.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonDTO {

    private Long id;

    @NotEmpty(message = "{firstName.required}")
    @Size(min = 2, max = 20, message = "{firstName.size}")
    private String firstName;

    @NotEmpty(message = "{lastName.required}")
    @Size(min = 2, max = 20, message = "{lastName.size}")
    private String lastName;

    @NotEmpty(message = "{cpf.required}")
    @CPF(message = "{cpf.invalid}")
    private String cpf;

    private String birthDate;

    private String registerDate;

    private String note;

    //@Valid
  //  @NotEmpty
    private List<PhoneDTO> phones;
}
