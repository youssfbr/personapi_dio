package com.github.youssfbr.personapi.services;

import com.github.youssfbr.personapi.mapper.PersonMapper;
import com.github.youssfbr.personapi.model.entities.Person;
import com.github.youssfbr.personapi.repositories.IPersonRepository;
import com.github.youssfbr.personapi.rest.dto.request.PersonDTO;
import com.github.youssfbr.personapi.rest.dto.response.MessageResponseDTO;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PersonService {

    private final IPersonRepository personRepository;
    private static final PersonMapper personMapper = PersonMapper.INSTANCE;


    public MessageResponseDTO createPerson(PersonDTO personDTO) {
        Person personToSave = personMapper.toModel(personDTO);

        Person savedPerson = personRepository.save(personToSave);
        return MessageResponseDTO
                .builder()
                .message("Created person with ID " + savedPerson.getId())
                .build();
    }
}
