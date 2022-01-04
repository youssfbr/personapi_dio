package com.github.youssfbr.personapi.rest.controllers.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiErros {

    private Instant dataHora = Instant.now();
    private HttpStatus status = HttpStatus.BAD_REQUEST;
    private List<String> erros;

    public ApiErros(List<String> erros) {
        this.erros = erros;
    }

    public ApiErros(String message) {
        this.erros = Arrays.asList(message);
    }

}
