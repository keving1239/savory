package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.dto.PostsDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.fasterxml.jackson.core.type.TypeReference;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = PostController.class)
class PostControllerIntTest {

    @Autowired
    private MockMvc mvc;


//    private PostService postService;

    @Autowired
    private ObjectMapper objectMapper;


    @TestConfiguration
    static class TestConfig {

        @Bean
        public PostService postService() {
            return Mockito.mock(PostService.class);
        }
    }




    @Test
    void getPostIfIDInSetIntTest() throws Exception
    {
//        List<PostsDto> samplePostsList = Arrays.asList(
//                createExpectedPostDto(31, 3, "Parmesian","Test", "Test", "cheesy", "1999")
//        );

        // Define the behavior of postService.findAllPosts() when called in the controller
//        Mockito.when(postService.findAllPosts()).thenReturn(samplePostsList);

        RequestBuilder request = MockMvcRequestBuilders.get("/posts/all")
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk()) // Expecting HTTP status 200
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
//        List<PostsDto> postsList = objectMapper.readValue(responseBody, new TypeReference<>() {});

//        Mockito.verify(postService, Mockito.times(1)).findAllPosts();
        assertEquals(200, result.getResponse().getStatus());
        System.out.println(result.getResponse().getStatus());

//        System.out.println(postsList);
        System.out.println(responseBody);
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