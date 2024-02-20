package com.savory.savoryAPI.person;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.savory.savoryAPI.person.dto.PersonDto;

@ExtendWith(SpringExtension.class)
class PersonControllerTest {

    private PersonController personController;
    private PersonService personService;

    @BeforeEach
    public void setup() {
        personService = mock(PersonService.class);
        personController = new PersonController(personService);
    }

    @Test
    void getPersonIfIDIsInSet() {
        //Arrange
        int userId = 2;
        PersonDto personDtoOne = createExpectedPersonDto(userId, "sanjit.muthineni", "sanjit.muthineni@credera.com", "password", null, "this is my bio", false);

        // Mock behavior of personService
        when(personService.getPerson(eq(userId))).thenReturn(personDtoOne);

        //Act
        PersonDto actualPersons = personController.getPerson(userId);

        // Assert
        assertEquals(personDtoOne, actualPersons); // Verify that actualPersons matches expectedPersons

        // Verify that the getPersonByEmail method of personService is called with the correct argument
        verify(personService, times(1)).getPerson(eq(userId));
    }

    @Test
    void getPersonByEmail() {
        String userEmail = "sanjit.muthineni@credera.com";
        PersonDto personDtoOne = createExpectedPersonDto(1, "test.user", "test.user@gmail.com", "password1", null, "the bio of test user", false);

        // Mock behavior of personService
        when(personService.getPersonByEmail(eq(userEmail))).thenReturn(personDtoOne);

        //Act
        PersonDto actualPersons = personController.getPersonByEmail(userEmail);

        //Assert
        assertEquals(personDtoOne, actualPersons); // Verify that actualPersons matches expectedPersons

        // Verify that the getPersonByEmail method of personService is called with the correct argument
        verify(personService, times(1)).getPersonByEmail(eq(userEmail));
    }

    @Test
    void getNoPersonIfNotExist() {
        int testUserId = 3;
        PersonDto expectedPerson = createExpectedPersonDto(1, "test1.user", "test1.user@gmail.com", "password1", null, "the bio of test user", false);
        //Mock
        when(personService.getPerson(testUserId)).thenReturn(expectedPerson);
        //Act
        PersonDto actualPerson = personController.getPerson(testUserId);
        //Assert
        assertEquals(expectedPerson, actualPerson);
        //Verify
        verify(personService, times(1)).getPerson(eq(testUserId));

    }

    private PersonDto createExpectedPersonDto(int id, String username, String email, String password, byte[] img, String bio, boolean isAdmin) {
        return PersonDto.builder()
                .id(id)
                .username(username)
                .email(email)
                .password(password)
                .img(new byte[0])
                .bio(bio)
                .isAdmin(isAdmin)
                .build();
    }
    
}
