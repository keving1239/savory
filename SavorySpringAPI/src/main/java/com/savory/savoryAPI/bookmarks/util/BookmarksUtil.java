package com.savory.savoryAPI.bookmarks.util;

import com.savory.savoryAPI.bookmarks.dto.BookmarksDto;
import com.savory.savoryAPI.bookmarks.entity.Bookmarks;

public class BookmarksUtil {

    public static BookmarksDto buildBookmarksDto(Bookmarks bookmark) {
        return BookmarksDto.builder()
                .id(bookmark.getId())
                .userId(bookmark.getUserId())
                .postId(bookmark.getPostId())
                .build();
    }
}