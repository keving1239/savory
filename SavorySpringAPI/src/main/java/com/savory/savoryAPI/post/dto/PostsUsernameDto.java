package com.savory.savoryAPI.post.dto;
import com.savory.savoryAPI.person.dto.PersonDto;
import com.savory.savoryAPI.person.entity.Person;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Builder
@Value
public class PostsDto {
    int post_id;
    int userID;
//    Person person;
    String headline;
    String ingredients;
    String recipe;
    byte[] img;
    String tags;
    String postdate;


}