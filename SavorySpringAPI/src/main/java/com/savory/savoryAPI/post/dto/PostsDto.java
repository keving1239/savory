package com.savory.savoryAPI.post.dto;

import lombok.Builder;
import lombok.Value;

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
    String postdate;
}
