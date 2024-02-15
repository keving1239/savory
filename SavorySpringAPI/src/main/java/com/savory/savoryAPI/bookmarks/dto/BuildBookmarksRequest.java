package com.savory.savoryAPI.bookmarks.dto;

import com.savory.savoryAPI.person.entity.Person;
import com.savory.savoryAPI.post.entity.Posts;
import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class BuildBookmarksRequest {
    int postId;
    int userId;
}