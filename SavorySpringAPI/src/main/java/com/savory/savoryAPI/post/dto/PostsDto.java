package com.savory.savoryAPI.post.dto;

import lombok.Builder;
import lombok.Value;

import java.sql.Timestamp;

@Builder
@Value
public class PostsDto {
    int postId;
    int userId;
    String headline;
    String ingredients;
    String recipe;
    String img;
    String tags;
    Timestamp postdate;
}
