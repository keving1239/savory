package com.savory.savoryAPI.post.dto;
import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class BuildPostRequest {
    int userID;
    String headline;
    String ingredients;
    String recipe;
    String img;
    String tags;
}
