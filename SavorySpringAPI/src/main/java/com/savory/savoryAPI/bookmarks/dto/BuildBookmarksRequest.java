package com.savory.savoryAPI.bookmarks.dto;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class BuildBookmarksRequest {
    int postId;
    int userId;
}