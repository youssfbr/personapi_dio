package com.github.youssfbr.personapi.services.interfaces;

import com.github.youssfbr.personapi.rest.dto.request.PersonDTO;
import com.github.youssfbr.personapi.rest.dto.response.MessageResponseDTO;

import java.util.List;

public interface IPersonService {

    List<PersonDTO> findAll();
    MessageResponseDTO createPerson(PersonDTO personDTO);
}
