package com.github.youssfbr.personapi.repositories;

import com.github.youssfbr.personapi.model.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IPersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByCpf(final String cpf);
}
