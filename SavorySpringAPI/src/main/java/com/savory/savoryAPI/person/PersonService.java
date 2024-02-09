package com.savory.savoryAPI.person;

import com.savory.savoryAPI.person.dto.CreatePersonRequest;
import com.savory.savoryAPI.person.dto.PersonDto;
import com.savory.savoryAPI.person.entity.Person;
import com.savory.savoryAPI.person.util.PersonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public PersonDto createPerson(CreatePersonRequest personDto) {
        var person = reify(personDto, new Person());
        var savedPerson = personRepository.save(person);
        return PersonUtil.buildPersonDto(savedPerson);
    }

    private Person reify(CreatePersonRequest personDto, Person target) {
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
}
