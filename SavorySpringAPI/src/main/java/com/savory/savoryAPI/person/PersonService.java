package com.savory.savoryAPI.person;

import com.savory.savoryAPI.person.dto.BuildPersonRequest;
import com.savory.savoryAPI.person.dto.PersonDto;
import com.savory.savoryAPI.person.entity.Person;
import com.savory.savoryAPI.person.util.PersonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public PersonDto createPerson(BuildPersonRequest personDto) {
        var newPerson = new Person();
        var savedPerson = reify(personDto, newPerson);
        return PersonUtil.buildPersonDto(savedPerson);
    }

    public PersonDto getPerson(Integer id) {
        var person = personRepository.findById(id).orElse(null);
        if(person == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Resource with id " + id + " not found");
        return PersonUtil.buildPersonDto(person);
    }
    public PersonDto getPersonByEmail(String email) {
        var person = personRepository.findByEmail(email).orElse(null);
        if(person == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Resource with email " + email + " not found");
        return PersonUtil.buildPersonDto(person);
    }
    public PersonDto getPersonByUsername(String username) {
        var person =  personRepository.findByUsername(username).orElse(null);
        if(person == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Resource with username " + username + " not found");
        return PersonUtil.buildPersonDto(person);
    }
    public PersonDto updatePerson(BuildPersonRequest personDto, Integer id) {
        var oldPerson = personRepository.findById(id).orElse(new Person());
        var savedPerson = reify(personDto, oldPerson);
        return PersonUtil.buildPersonDto(savedPerson);
    }
    public Boolean updatePersonImg(String img, Integer id) {
        var person = personRepository.findById(id).orElse(null);
        if(person == null) return false;
//        var imgBytes = img.getBytes(StandardCharsets.UTF_8);
        person.setImg(img);
        return personRepository.save(person).getImg().equals(img);
    }

    public Boolean updatePersonBio(String bio, Integer id) {
        var person = personRepository.findById(id).orElse(null);
        if(person == null) return false;
        person.setBio(bio);
        return personRepository.save(person).getBio().equals(bio);
    }
    public Boolean deletePerson(Integer id) {
        Boolean exists = personRepository.existsById(id);
        personRepository.deleteById(id);
        return exists;
    }

    private Person reify(BuildPersonRequest personDto, Person target) {
        target.setUsername(personDto.getUsername());
        target.setEmail(personDto.getEmail());
        target.setPassword(personDto.getPassword());
        target.setImg(personDto.getImg());
        target.setBio(personDto.getBio());
        target.setAdmin(personDto.isAdmin());
        return personRepository.save(target);
    }

    public List<PersonDto> findAll() {
        return personRepository.findAll()
                .stream()
                .map(PersonUtil::buildPersonDto)
                .collect(Collectors.toList());
    }

    public Boolean isUsernameAvailable(String username) {
        return personRepository.findByUsername(username).orElse(null) == null;
    }

    public Boolean updatePersonUsername(String username, Integer id) {
        var person = personRepository.findById(id).orElse(null);
        if(person == null) return false;
        person.setUsername(username);
        return personRepository.save(person).getUsername().equals(username);
    }
}
