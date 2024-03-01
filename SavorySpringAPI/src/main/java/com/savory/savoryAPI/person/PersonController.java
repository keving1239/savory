package com.savory.savoryAPI.person;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.savory.savoryAPI.person.dto.BuildPersonRequest;
import com.savory.savoryAPI.person.dto.PersonDto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"https://savory.azurewebsites.net", "http://localhost:3000"})
@RequestMapping("/api/person")
public class PersonController {

    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/all")
    public List<PersonDto> getAllPersons() {
        return personService.findAll();
    }
    @GetMapping("/byId/{id}")
    public PersonDto getPerson(@PathVariable("id") Integer id) {
        return personService.getPerson(id);
    }
    @GetMapping("/byEmail/{email}")
    public PersonDto getPersonByEmail(@PathVariable("email") String email) {
        return personService.getPersonByEmail(email);
    }
    @GetMapping("/byUsername/{username}")
    public PersonDto getPersonByUsername(@PathVariable("username") String username) {
        return personService.getPersonByUsername(username);
    }
    @GetMapping("/usernameExists/{username}")
    public Boolean isUsernameAvailable(@PathVariable("username") String username) {
        return personService.usernameExists(username);
    }
    @GetMapping("/emailExists/{email}")
    public Boolean emailExists(@PathVariable("email") String email) {
        return personService.emailExists(email);
    }

    @PostMapping("/new")
    public PersonDto createPerson(@RequestBody BuildPersonRequest request) {
        return personService.createPerson(request);
    }

    @PutMapping("/edit/{id}")
    public PersonDto updatePerson(@RequestBody BuildPersonRequest request,@PathVariable("id") Integer id) {
        return personService.updatePerson(request, id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePerson(@PathVariable("id") Integer id) {
        return (personService.deletePerson(id)) ?
                ResponseEntity.ok("User with id " + id + " deleted") :
                ResponseEntity.status(HTTPResponse.SC_NOT_FOUND).body("User with id " + id + " not found.");
    }

}
