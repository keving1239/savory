package com.savory.savoryAPI.post;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.savory.savoryAPI.post.dto.PostsDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(SpringExtension.class)
class PostControllerTest
{
    private PostController postController;
    private PostService postService;



    @BeforeEach
    public void setUp() {
        postService = mock(PostService.class);
        postController = new PostController(postService);
    }

    @Test
    void getUserPostsIfIDIsInSet()
    {
        // Arrange
        int userId = 3;
        PostsDto postsDto = createExpectedPostDto(31, 3, "Parmesian","Test", "Test", "cheesy", "1999");
        PostsDto postsDto2 = createExpectedPostDto(37, 3, "Pasta","Sauce", "Cook in Water", "unhealthy", "2023");
        PostsDto postsDto3 = createExpectedPostDto(39, 3, "Curry","Spices", "Boil", "indian", "2003");
        List<PostsDto> expectedPosts = Arrays.asList(

                postsDto, postsDto2, postsDto3
        );

        // Mock the behavior of the postService
        when(postService.findPostByUserID(eq(postsDto.getUserID()))).thenReturn(expectedPosts);

        // Act
        List<PostsDto> actualPosts = postController.getUserPosts(userId);

        // Assert
        assertEquals(expectedPosts, actualPosts);

        System.out.println(actualPosts);
        System.out.println(expectedPosts);
        // Verify that the findPostByUserID method of postService is called with the correct argument
        verify(postService, times(1)).findPostByUserID(userId);


    }

    @Test
    void getNoUserPostsIfNotInSet()
    {
        // Arrange
        int userId = 2;
        PostsDto postsDto = createExpectedPostDto(31, 3, "Parmesian","Test", "Test", "cheesy", "1999");
        PostsDto postsDto2 = createExpectedPostDto(37, 3, "Pasta","Sauce", "Cook in Water", "unhealthy", "2023");
        PostsDto postsDto3 = createExpectedPostDto(39, 3, "Curry","Spices", "Boil", "indian", "2003");
        List<PostsDto> expectedPosts = Arrays.asList(

                postsDto, postsDto2, postsDto3
        );

        // Mock the behavior of the postService
        when(postService.findPostByUserID(eq(postsDto.getUserID()))).thenReturn(expectedPosts);

        // Act
        List<PostsDto> actualPosts = postController.getUserPosts(userId);

        // Assert
        assertEquals(0, actualPosts.size());

//        System.out.println(actualPosts);
//        System.out.println(expectedPosts);
        // Verify that the findPostByUserID method of postService is called with the correct argument
        verify(postService, times(1)).findPostByUserID(userId);


    }

    @Test
    void getSpecificPostsInSet()
    {
        // Arrange
        int userId = 2;
        PostsDto postsDto = createExpectedPostDto(31, 2, "Parmesian","Test", "Test", "cheesy", "1999");
        PostsDto postsDto2 = createExpectedPostDto(37, 2, "Pasta","Sauce", "Cook in Water", "unhealthy", "2023");
        PostsDto postsDto3 = createExpectedPostDto(39, 4, "Curry","Spices", "Boil", "indian", "2003");
        List<PostsDto> expectedPosts = Arrays.asList(

                postsDto, postsDto2, postsDto3
        );

        List<PostsDto> expectedSpecifics = Arrays.asList(expectedPosts.get(0), expectedPosts.get(1));


        // Mock the behavior of the postService
        when(postService.findPostByUserID(eq(postsDto.getUserID()))).thenReturn(expectedSpecifics);

        // Act
        List<PostsDto> actualPosts = postController.getUserPosts(userId);

        // Assert
        assertEquals(expectedSpecifics, actualPosts);

        System.out.println(actualPosts);
        System.out.println(expectedSpecifics);
        // Verify that the findPostByUserID method of postService is called with the correct argument
        verify(postService, times(1)).findPostByUserID(userId);


    }

    private PostsDto createExpectedPostDto(int post_id, int user_id, String headline, String ingredients, String recipe, String tags, String postdate) {
        // Use reflection or other methods to create an instance of PostsDto
        return PostsDto.builder()
                .post_id(post_id)
                .userID(user_id)
                .headline(headline)
                .ingredients(ingredients)
                .recipe(recipe)
                .img(new byte[0])
                .tags(tags)
                .postdate(postdate)
                .build();
    }
}