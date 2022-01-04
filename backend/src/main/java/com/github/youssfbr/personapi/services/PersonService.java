package com.github.youssfbr.personapi.services;

import com.github.youssfbr.personapi.mapper.PersonMapper;
import com.github.youssfbr.personapi.model.entities.Person;
import com.github.youssfbr.personapi.repositories.IPersonRepository;
import com.github.youssfbr.personapi.rest.dto.request.PersonDTO;
import com.github.youssfbr.personapi.rest.dto.response.MessageResponseDTO;

import com.github.youssfbr.personapi.services.exceptions.PersonNotFoundException;
import com.github.youssfbr.personapi.services.interfaces.IPersonService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PersonService implements IPersonService {

    private final IPersonRepository personRepository;
    private static final PersonMapper personMapper = PersonMapper.INSTANCE;


    @Override
    @Transactional(readOnly = true)
    public List<PersonDTO> findAll() {
        List<Person> allPeople = personRepository.findAll();
        return allPeople.stream()
                .map(personMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PersonDTO findById(final Long id) throws PersonNotFoundException {
        return personRepository
                .findById(id)
                .map(personMapper::toDTO)
                .orElseThrow(() -> new PersonNotFoundException(id));
    }

    @Override
    @Transactional
    public MessageResponseDTO createPerson(PersonDTO personDTO) {
        Person personToSave = personMapper.toModel(personDTO);

        Person savedPerson = personRepository.save(personToSave);
        return MessageResponseDTO
                .builder()
                .message("Created person with ID " + savedPerson.getId())
                .build();
    }
}
