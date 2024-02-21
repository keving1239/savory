package com.savory.savoryAPI.post;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import com.savory.savoryAPI.post.dto.PostsDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class PostTests2 {
    
    private PostController postController;
    private PostService postService;

    @BeforeEach
    public void setUp() {
        postService = mock(PostService.class);
        postController = new PostController(postService);
    }

    private PostsDto createExpectedPostDto(int postId, int userId, String headline, String ingredients, String recipe, String tags, String postdate) {
        // Use reflection or other methods to create an instance of PostsDto
        return PostsDto.builder()
                .postId(postId)
                .userID(userId)
                .headline(headline)
                .ingredients(ingredients)
                .recipe(recipe)
                .img("")
                .tags(tags)
                .postdate(postdate)
                .build();
    }
}
