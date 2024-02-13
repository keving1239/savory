package com.savory.savoryAPI.person;

import com.savory.savoryAPI.person.dto.BuildPersonRequest;
import com.savory.savoryAPI.person.dto.PersonDto;
import com.savory.savoryAPI.person.entity.Person;
import com.savory.savoryAPI.person.util.PersonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Person getPerson(Integer id) {
        return personRepository.findById(id).orElse(null);
    }
    public Integer getPersonID(String username, String password) {
        var person = personRepository.findByUsernameAndPassword(username, password).orElse(null);
        return person == null ? -1 : person.getId();
    }
    public PersonDto updatePerson(BuildPersonRequest personDto, Integer id) {
        var oldPerson = personRepository.findById(id).orElse(new Person());
        var savedPerson = reify(personDto, oldPerson);
        return PersonUtil.buildPersonDto(savedPerson);
    }
    public Boolean updatePersonImg(String img, Integer id) {
        var person = personRepository.findById(id).orElse(null);
        if(person == null) return false;
        var imgBytes = img.getBytes(StandardCharsets.UTF_8);
        person.setImg(imgBytes);
        return Arrays.equals(personRepository.save(person).getImg(), imgBytes);
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
}
