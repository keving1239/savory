package com.savory.savoryAPI.interaction.dto;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class InteractionDto {
    int id;
    int postId;
    int userId;
    boolean isLiked;
    boolean isShared;
    boolean isBookmarked;
}
