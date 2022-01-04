package com.github.youssfbr.personapi.rest.controllers;

import com.github.youssfbr.personapi.rest.dto.request.PersonDTO;
import com.github.youssfbr.personapi.rest.dto.response.MessageResponseDTO;
import com.github.youssfbr.personapi.services.PersonService;
import com.github.youssfbr.personapi.services.exceptions.PersonNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/peoples")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @GetMapping
    public ResponseEntity<List<PersonDTO>> findAll() {
        return ResponseEntity.ok(personService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<PersonDTO> findById(@PathVariable Long id) throws PersonNotFoundException {
        return ResponseEntity.ok(personService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO createPerson(@RequestBody @Valid PersonDTO personDTO) {
        return personService.createPerson(personDTO);
    }
}
