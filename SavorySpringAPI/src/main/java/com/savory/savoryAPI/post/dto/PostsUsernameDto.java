package com.savory.savoryAPI.post.dto;
import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class PostsUsernameDto {
    int postId;
    int userId;
    String headline;
    String ingredients;
    String recipe;
    String img;
    String tags;
    String postdate;
    String username;


}