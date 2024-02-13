package com.savory.savoryAPI.person.util;

import com.savory.savoryAPI.person.dto.PersonDto;
import com.savory.savoryAPI.person.entity.Person;


public class PersonUtil {
    public static PersonDto buildPersonDto(Person person) {
        return PersonDto.builder()
                .username(person.getUsername())
                .email(person.getEmail())
                .password(person.getPassword())
                .img(person.getImg())
                .bio(person.getBio())
                .isAdmin(person.isAdmin())
                .build();
    }
}
