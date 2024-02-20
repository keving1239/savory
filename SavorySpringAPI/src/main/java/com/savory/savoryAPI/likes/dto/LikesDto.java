package com.savory.savoryAPI.likes.dto;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class LikesDto {
    int id;
    int postId;
    int userId;
}
