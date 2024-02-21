package com.savory.savoryAPI.interaction.dto;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class BuildInteractionRequest {
    int postId;
    int userId;
    boolean isLiked;
    boolean isBookmarked;
}
