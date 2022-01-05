package com.github.youssfbr.personapi.mapper;

import com.github.youssfbr.personapi.model.entities.Person;
import com.github.youssfbr.personapi.rest.dto.request.PersonDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PersonMapper {

    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    @Mapping(target = "birthDate", source = "birthDate", dateFormat = "dd/MM/yyyy")
    @Mapping(target = "registerDate", source = "registerDate", dateFormat = "dd/MM/yyyy")
    Person toModel(PersonDTO personDTO);

    PersonDTO toDTO(Person person);

}
