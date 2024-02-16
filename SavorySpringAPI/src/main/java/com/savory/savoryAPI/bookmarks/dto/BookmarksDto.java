package com.savory.savoryAPI.bookmarks.dto;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class BookmarksDto {
    int id;
    int postId;
    int userId;
}