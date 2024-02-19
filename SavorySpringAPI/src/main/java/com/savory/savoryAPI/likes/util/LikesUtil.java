package com.savory.savoryAPI.likes.util;

import com.savory.savoryAPI.likes.dto.LikesDto;
import com.savory.savoryAPI.likes.entity.Likes;

public class LikesUtil {
    public static LikesDto buildLikesDto(Likes like) {
        return LikesDto.builder()
                .id(like.getId())
                .userId(like.getUserId())
                .postId(like.getPostId())
                .build();
    }
}
