package com.github.youssfbr.personapi.services;

import com.github.youssfbr.personapi.mapper.PersonMapper;
import com.github.youssfbr.personapi.model.entities.Person;
import com.github.youssfbr.personapi.repositories.IPersonRepository;
import com.github.youssfbr.personapi.rest.dto.request.PersonDTO;
import com.github.youssfbr.personapi.rest.dto.response.MessageResponseDTO;

import com.github.youssfbr.personapi.services.exceptions.CpfExistsException;
import com.github.youssfbr.personapi.services.exceptions.DatabaseException;
import com.github.youssfbr.personapi.services.exceptions.InternalServerError;
import com.github.youssfbr.personapi.services.exceptions.PersonNotFoundException;
import com.github.youssfbr.personapi.services.interfaces.IPersonService;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
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
    public MessageResponseDTO createPerson(final PersonDTO personDTO) {

        checkCPF(personDTO.getCpf());

        Person personToSave = personMapper.toModel(personDTO);

        Person savedPerson = personRepository.save(personToSave);

        return createMessageResponse("Pessoa criada com ID ", savedPerson.getId());
    }

    @Override
    @Transactional
    public MessageResponseDTO updatePerson(final long id, final PersonDTO personDTO) throws PersonNotFoundException {

        verifyIfExists(id);

        checkCPF(personDTO.getCpf());

        Person personToUpdate = personMapper.toModel(personDTO);

        Person updatedPerson = personRepository.save(personToUpdate);

        return createMessageResponse("Pessoa atualizada com ID ", updatedPerson.getId());
    }

    @Override
    public void delete(final Long id) throws PersonNotFoundException {
        try {
            personRepository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new PersonNotFoundException(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Não foi possível excluir. Violação de integridade.", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            throw new InternalServerError("Erro interno. Por favor entrar em contato com o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Person verifyIfExists(final Long id) throws PersonNotFoundException {
        return personRepository
                .findById(id)
                .orElseThrow(() -> new PersonNotFoundException(id));
    }

    private MessageResponseDTO createMessageResponse(final String message, final Long id) {
        return MessageResponseDTO
                .builder()
                .message(message + id)
                .build();
    }

    private void checkCPF(String cpf) {
        var cpfExists = personRepository.findByCpf(cpf);
        if (cpfExists.isPresent()) throw new CpfExistsException("Não foi possível cadastrar. CPF já existente.");
    }
}
