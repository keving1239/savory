package com.savory.savoryAPI.post.dto;

import lombok.Builder;
import lombok.Value;


@Builder
@Value
public class PostsDto {
    int post_id;
    int userID;
//    Person person;
    String headline;
    String ingredients;
    String recipe;
    String img;
    String tags;
    String postdate;


}