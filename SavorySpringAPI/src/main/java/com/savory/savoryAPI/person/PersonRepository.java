package com.savory.savoryAPI.person;

import com.savory.savoryAPI.person.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
    Optional<Person> findById(Integer id);
    Optional<Person> findByEmail(String email);
}