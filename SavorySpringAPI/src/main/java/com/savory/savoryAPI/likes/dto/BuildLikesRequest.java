package com.savory.savoryAPI.likes.dto;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class BuildLikesRequest {
    int postId;
    int userId;
}
