package com.github.youssfbr.personapi.services;

import com.github.youssfbr.personapi.model.entities.Person;
import com.github.youssfbr.personapi.repositories.IPersonRepository;
import com.github.youssfbr.personapi.rest.dto.request.PersonDTO;
import com.github.youssfbr.personapi.rest.dto.response.MessageResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class PersonService {

    private IPersonRepository personRepository;

    @Autowired
    public PersonService(IPersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public MessageResponseDTO createPerson(PersonDTO personDTO) {
        Person personToSave = Person.builder()
                .firstName(personDTO.getFirstName())
                .lastName(personDTO.getLastName())
                .cpf(personDTO.getCpf())
                .birthDate(LocalDate.parse(personDTO.getBirthDate(), DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                .build();

        Person savedPerson = personRepository.save(personToSave);
        return MessageResponseDTO
                .builder()
                .message("Created person with ID " + savedPerson.getId())
                .build();
    }
}
