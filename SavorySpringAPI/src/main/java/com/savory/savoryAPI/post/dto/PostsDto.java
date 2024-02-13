package com.savory.savoryAPI.post.dto;
import com.savory.savoryAPI.person.dto.PersonDto;
import com.savory.savoryAPI.person.entity.Person;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Builder
@Value
public class PostsDto {
    long post_id;
    long userID;
//    Person person;
    String headline;
    String ingredients;
    String recipe;
    String img;
    String tag1;
    String tag2;
    String postdate;


}