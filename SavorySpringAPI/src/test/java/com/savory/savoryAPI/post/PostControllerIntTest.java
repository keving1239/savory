package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.dto.PostsDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.fasterxml.jackson.core.type.TypeReference;

@ExtendWith(SpringExtension.class)
//@WebMvcTest(value = PostController.class)
@AutoConfigureMockMvc
@SpringBootTest


//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@TestPropertySource(locations = "classpath:application.properties")
//@ContextConfiguration(locations = "classpath:applicationContext.xml")
class PostControllerIntTest
{

    @Autowired
    private MockMvc mvc;


    @Autowired
    private PostService postService; // Autowire the actual PostService

//    @Autowired
//    private PostRepository postRepository;
//
//    @Autowired
//    private PostsURepository postsURepository;

    @Autowired
    private ObjectMapper objectMapper;











    @Test
    void getPostIfIDInSetIntTest() throws Exception
    {
//        List<PostsDto> samplePostsList = Arrays.asList(
//                createExpectedPostDto(31, 3, "Parmesian","Test", "Test", "cheesy", "1999")
//        );

        // Define the behavior of postService.findAllPosts() when called in the controller
//        Mockito.when(postService.findAllPosts()).thenReturn(Collections.emptyList());

        RequestBuilder request = MockMvcRequestBuilders.get("/posts/all");
//                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk()) // Expecting HTTP status 200
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();

//        Mockito.verify(postService, Mockito.times(1)).findAllPosts();
        assertEquals(200, result.getResponse().getStatus());
        System.out.println(result.getResponse().getStatus());

//        System.out.println(postsList);
        System.out.println(responseBody);
    }

    @Test
    void getPostIfIDInSetIntTestForUsername() throws Exception
    {
//        List<PostsDto> samplePostsList = Arrays.asList(
//                createExpectedPostDto(31, 3, "Parmesian","Test", "Test", "cheesy", "1999")
//        );

        // Define the behavior of postService.findAllPosts() when called in the controller
//        Mockito.when(postService.findAllPosts()).thenReturn(Collections.emptyList());

        RequestBuilder request = MockMvcRequestBuilders.get("/posts/allWithUsername");
//                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk()) // Expecting HTTP status 200
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();

//        Mockito.verify(postService, Mockito.times(1)).findAllPosts();
        assertEquals(200, result.getResponse().getStatus());
        System.out.println(result.getResponse().getStatus());

//        System.out.println(postsList);
        System.out.println(responseBody);
    }




}