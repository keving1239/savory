package com.savory.savoryAPI.post.dto;
import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class PostsUsernameDto {
    int post_id;
    int userID;
    String headline;
    String ingredients;
    String recipe;
    String img;
    String tags;
    String postdate;
    String username;


}