package com.savory.savoryAPI.person;

import com.savory.savoryAPI.person.dto.CreatePersonRequest;
import com.savory.savoryAPI.person.dto.PersonDto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path=  "/profile")
public class PersonController {

    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public List<PersonDto> getAllPersons() {
        return personService.findAll();
    }

    @PostMapping
    public PersonDto createPerson(@RequestBody CreatePersonRequest personDTO) {
        return personService.createPerson(personDTO);
    }
}
