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
    byte[] img;
    String tags;
    String postdate;


}