package com.savory.savoryAPI.post;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.savory.savoryAPI.post.dto.PostsDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class PostControllerTest
{
    private PostController postController;
    private PostService postService;
    private final Date CLOCK = new Date();
    private final Timestamp DATE = new Timestamp(CLOCK.getTime());



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
        PostsDto postsDto = createExpectedPostDto(31, 3, "Parmesian","Test", "Test", "cheesy", DATE);
        PostsDto postsDto2 = createExpectedPostDto(37, 3, "Pasta","Sauce", "Cook in Water", "unhealthy", DATE);
        PostsDto postsDto3 = createExpectedPostDto(39, 3, "Curry","Spices", "Boil", "indian", DATE);
        List<PostsDto> expectedPosts = Arrays.asList(

                postsDto, postsDto2, postsDto3
        );
        // Mock the behavior of the postService
        when(postService.findPostByUserId(eq(postsDto.getUserId()), eq(1), eq(12))).thenReturn(expectedPosts);
        // Act
        List<PostsDto> actualPosts = postController.getUserPosts(userId, 1, 12);
        // Assert
        assertEquals(expectedPosts, actualPosts);
        // Verify that the findPostByUserId method of postService is called with the correct argument
        verify(postService, times(1)).findPostByUserId(eq(userId), eq(1), eq(12));


    }

    @Test
    void getNoUserPostsIfNotInSet()
    {
        // Arrange
        int userId = 2;
        PostsDto postsDto = createExpectedPostDto(31, 3, "Parmesian","Test", "Test", "cheesy", DATE);
        PostsDto postsDto2 = createExpectedPostDto(37, 3, "Pasta","Sauce", "Cook in Water", "unhealthy", DATE);
        PostsDto postsDto3 = createExpectedPostDto(39, 3, "Curry","Spices", "Boil", "indian", DATE);
        List<PostsDto> expectedPosts = Arrays.asList(

                postsDto, postsDto2, postsDto3
        );
        // Mock the behavior of the postService
        when(postService.findPostByUserId(eq(postsDto.getUserId()), eq(1), eq(12))).thenReturn(expectedPosts);
        // Act
        List<PostsDto> actualPosts = postController.getUserPosts(userId, 1, 12);
        // Assert
        assertEquals(0, actualPosts.size());
        // Verify that the findPostByUserId method of postService is called with the correct argument
        verify(postService, times(1)).findPostByUserId(eq(userId), eq(1), eq(12));


    }

    @Test
    void getSpecificPostsInSet()
    {
        // Arrange
        int userId = 2;
        PostsDto postsDto = createExpectedPostDto(31, 2, "Parmesian","Test", "Test", "cheesy", DATE);
        PostsDto postsDto2 = createExpectedPostDto(37, 2, "Pasta","Sauce", "Cook in Water", "unhealthy", DATE);
        PostsDto postsDto3 = createExpectedPostDto(39, 4, "Curry","Spices", "Boil", "indian", DATE);
        List<PostsDto> expectedPosts = Arrays.asList(

                postsDto, postsDto2, postsDto3
        );
        List<PostsDto> expectedSpecifics = Arrays.asList(expectedPosts.get(0), expectedPosts.get(1));
        // Mock the behavior of the postService
        when(postService.findPostByUserId(eq(postsDto.getUserId()), eq(1), eq(12))).thenReturn(expectedSpecifics);
        // Act
        List<PostsDto> actualPosts = postController.getUserPosts(userId, 1, 12);
        // Assert
        assertEquals(expectedSpecifics, actualPosts);
        // Verify that the findPostByUserId method of postService is called with the correct argument
        verify(postService, times(1)).findPostByUserId(eq(userId), eq(1), eq(12));


    }

    private PostsDto createExpectedPostDto(int postId, int userId, String headline, String ingredients, String recipe, String tags, Timestamp postdate) {
        // Use reflection or other methods to create an instance of PostsDto
        return PostsDto.builder()
                .postId(postId)
                .userId(userId)
                .headline(headline)
                .ingredients(ingredients)
                .recipe(recipe)
                .img("")
                .tags(tags)
                .postdate(postdate)
                .build();
    }
}