package com.github.youssfbr.personapi.repositories;

import com.github.youssfbr.personapi.model.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPersonRepository extends JpaRepository<Person, Long> {
}
