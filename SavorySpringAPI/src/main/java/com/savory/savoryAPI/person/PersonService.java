package com.savory.savoryAPI.person;

import com.savory.savoryAPI.person.dto.BuildPersonRequest;
import com.savory.savoryAPI.person.dto.PersonDto;
import com.savory.savoryAPI.person.entity.Person;
import com.savory.savoryAPI.person.util.PersonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public PersonDto createPerson(BuildPersonRequest request) {
        var newPerson = reify(request, new Person());
        return PersonUtil.buildPersonDto(newPerson);
    }
    public PersonDto getPerson(Integer id) {
        var person = personRepository.findById(id).orElse(null);
        if(person == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User with id " + id + " not found");
        return PersonUtil.buildPersonDto(person);
    }
    public PersonDto getPersonByEmail(String email) {
        var person = personRepository.findByEmail(email).orElse(null);
        if(person == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User with email " + email + " not found");
        return PersonUtil.buildPersonDto(person);
    }
    public PersonDto getPersonByUsername(String username) {
        var person =  personRepository.findByUsername(username).orElse(null);
        if(person == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User with username " + username + " not found");
        return PersonUtil.buildPersonDto(person);
    }
    public PersonDto updatePerson(BuildPersonRequest request, Integer id) {
        var oldPerson = personRepository.findById(id).orElse(null);
        if(oldPerson == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User with id " + id + " not found");
        var newPerson = reify(request, oldPerson);
        return PersonUtil.buildPersonDto(newPerson);
    }

    public Boolean deletePerson(Integer id) {
        if(!personRepository.existsById(id)) return false;
        personRepository.deleteById(id);
        return !personRepository.existsById(id);
    }

    private Person reify(BuildPersonRequest request, Person target) {
        target.setUsername(request.getUsername());
        target.setEmail(request.getEmail());
        target.setImg(request.getImg());
        target.setBio(request.getBio());
        return personRepository.save(target);
    }

    public List<PersonDto> findAll() {
        return personRepository.findAll()
                .stream()
                .map(PersonUtil::buildPersonDto)
                .collect(Collectors.toList());
    }

    public Boolean usernameExists(String username) {
        return personRepository.findByUsername(username).orElse(null) != null;
    }

    public Boolean emailExists(String email) {
        return personRepository.findByEmail(email).orElse(null) != null;
    }
}
