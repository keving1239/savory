package com.savory.savoryAPI.post;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import com.savory.savoryAPI.post.dto.PostsUsernameDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class PostControllerUsernameTest {

    private PostController postController;
    private PostService postService;

    @BeforeEach
    public void setUp() {
        postService = mock(PostService.class);
        postController = new PostController(postService);
    }

    @Test
    void getPostUsernames()
    {
        // Arrange
        PostsUsernameDto postsUDto = createExpectedPostUsernameDto(3, 4, "Chicken","Chicken, Herbs", "Cook it", "bird, meat", Timestamp.valueOf("2010-10-10 10:10:10"),"u1");
        PostsUsernameDto postsUDto2 = createExpectedPostUsernameDto(80, 4, "Steak","Meat, Salt, Grill", "Put on grill", "tasty", Timestamp.valueOf("2010-10-10 10:10:10"), "u2");
        PostsUsernameDto postsUDto3 = createExpectedPostUsernameDto(4, 9, "Red Pepper","Vegetables, Other Things", "Roast", "vegetable", Timestamp.valueOf("2010-10-10 10:10:10"), "u3");
        List<PostsUsernameDto> expectedPosts = Arrays.asList(

                postsUDto, postsUDto2, postsUDto3
        );

        // Mock the behavior of the postService
        when(postService.findPostAndUsername(1, 12, Sort.by("postId").descending())).thenReturn(expectedPosts);

        // Act
        List<PostsUsernameDto> actualPosts = postController.getFeed(1, 12);

        // Assert
        assertEquals(3, actualPosts.size());

//        System.out.println(actualPosts);
//        System.out.println(expectedPosts);
        // Verify that the findPostByUserID method of postService is called with the correct argument
        verify(postService, times(1)).findPostAndUsername(1, 12, Sort.by("postId").descending());


    }


    private PostsUsernameDto createExpectedPostUsernameDto(int postId, int userId, String headline, String ingredients, String recipe, String tags, Timestamp postdate, String username) {
        // Use reflection or other methods to create an instance of PostsDto
        return PostsUsernameDto.builder()
                .postId(postId)
                .userId(userId)
                .headline(headline)
                .ingredients(ingredients)
                .recipe(recipe)
                .img("")
                .tags(tags)
                .postdate(postdate)
                .username(username)
                .build();
    }

}


