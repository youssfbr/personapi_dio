package com.github.youssfbr.personapi.services.interfaces;

import com.github.youssfbr.personapi.rest.dto.request.PersonDTO;
import com.github.youssfbr.personapi.rest.dto.response.MessageResponseDTO;
import com.github.youssfbr.personapi.services.exceptions.PersonNotFoundException;

import java.util.List;

public interface IPersonService {

    List<PersonDTO> findAll();
    PersonDTO findById(final Long id) throws PersonNotFoundException;
    MessageResponseDTO createPerson(PersonDTO personDTO);
}
