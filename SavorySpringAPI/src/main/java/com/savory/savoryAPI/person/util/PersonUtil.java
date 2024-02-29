package com.savory.savoryAPI.person.util;

import com.savory.savoryAPI.person.dto.PersonDto;
import com.savory.savoryAPI.person.entity.Person;


public class PersonUtil {
    public static PersonDto buildPersonDto(Person person) {
        return PersonDto.builder()
                .id(person.getId())
                .username(person.getUsername())
                .email(person.getEmail())
                .img(person.getImg())
                .bio(person.getBio())
                .build();
    }
}
