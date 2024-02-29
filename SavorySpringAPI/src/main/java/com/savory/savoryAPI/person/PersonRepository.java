package com.savory.savoryAPI.person;

import com.savory.savoryAPI.person.entity.Person;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
    @Query("SELECT p FROM Person p WHERE p.id = :id")
    Optional<Person> findById(Integer id);
    @Query("SELECT p FROM Person p WHERE p.email = :email")
    Optional<Person> findByEmail(String email);
    @Query("SELECT p FROM Person p WHERE p.username = :username")
    Optional<Person> findByUsername(String username);
    @Transactional
    @Modifying
    @Query("DELETE FROM Person WHERE id = :id")
    void deleteById(@Param("id") int id);
}