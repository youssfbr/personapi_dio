package com.github.youssfbr.personapi.rest.controllers;

import com.github.youssfbr.personapi.model.entities.Person;
import com.github.youssfbr.personapi.repositories.IPersonRepository;
import com.github.youssfbr.personapi.rest.dto.response.MessageResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/peoples")
@RequiredArgsConstructor
public class PersonController {

    private final IPersonRepository personRepository;

    @GetMapping
    public String getPerson() {
        return "OK!";
    }

    @PostMapping
    public MessageResponseDTO createPerson(@RequestBody Person person) {

        Person savedPerson = personRepository.save(person);
        return MessageResponseDTO
                .builder()
                .message("Created person with ID " + savedPerson.getId())
                .build();
    }
}
