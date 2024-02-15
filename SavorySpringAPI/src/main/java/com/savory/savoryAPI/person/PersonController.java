package com.savory.savoryAPI.person;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.savory.savoryAPI.person.dto.BuildPersonRequest;
import com.savory.savoryAPI.person.dto.PersonDto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PersonController {

    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/api/person/all")
    public List<PersonDto> getAllPersons() {
        return personService.findAll();
    }
    @GetMapping("/api/person/email/{email}")
    public PersonDto getPersonByEmail(@PathVariable("email") String email) {
        return personService.getPersonByEmail(email);
    }
    @PostMapping("api/person/new")
    public PersonDto createPerson(@RequestBody BuildPersonRequest personDTO) {
        return personService.createPerson(personDTO);
    }
    @GetMapping("api/person/{id}")
    public PersonDto getPerson(@PathVariable("id") Integer id) {
        return personService.getPerson(id);
    }

    @PutMapping("api/person/{id}/edit")
    public PersonDto updatePerson(@RequestBody BuildPersonRequest personDto,@PathVariable("id") Integer id) {
        return personService.updatePerson(personDto, id);
    }
    @PutMapping("api/person/{id}/edit/img")
    public ResponseEntity<String> updatePersonImg(@RequestBody String img, @PathVariable("id") Integer id) {
        return (personService.updatePersonImg(img, id)) ?
                ResponseEntity.ok("Resource with id " + id + " img set to " + img) :
                ResponseEntity.status(HTTPResponse.SC_NOT_FOUND).body("Resource with id " + id + " not found.");
    }
    @PutMapping("api/person/{id}/edit/bio")
    public ResponseEntity<String> updatePersonBio(@RequestBody String bio, @PathVariable("id") Integer id) {
        return (personService.updatePersonBio(bio, id)) ?
                ResponseEntity.ok("Resource with id " + id + " bio set to " + bio) :
                ResponseEntity.status(HTTPResponse.SC_NOT_FOUND).body("Resource with id " + id + " not found.");
    }


    @DeleteMapping("api/person/delete/{id}")
    public ResponseEntity<String> deletePerson(@PathVariable("id") Integer id) {
        return (personService.deletePerson(id)) ?
                ResponseEntity.ok("Resource with id " + id + " deleted") :
                ResponseEntity.status(HTTPResponse.SC_NOT_FOUND).body("Resource with id " + id + " not found.");
    }

}
