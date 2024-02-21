package com.savory.savoryAPI.interaction.util;

import com.savory.savoryAPI.interaction.dto.InteractionDto;
import com.savory.savoryAPI.interaction.entity.Interaction;

public class InteractionUtil {
    public static InteractionDto buildInteractionDto(Interaction interaction) {
        return InteractionDto.builder()
                .id(interaction.getId())
                .userId(interaction.getUserId())
                .postId(interaction.getPostId())
                .isLiked(interaction.isLiked())
                .isBookmarked(interaction.isBookmarked())
                .build();
    }
}
