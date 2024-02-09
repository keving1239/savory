package com.savory.savoryAPI.post.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Builder
@Value
public class PostsDto {
    int id;
    int userID;
    String headline;
    String ingredients;
    String recipe;
    String pictureURL;
    String tag1;
    String tag2;
    String date;


}