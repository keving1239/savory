package com.savory.savoryAPI.post;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest
class PostControllerIntTest {

    @Autowired
    private MockMvc mvc;

    @WithMockUser(value="test")
    @Test
    void getAllPostsIntTest() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders.get("/api/posts/all");
        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
        assertEquals(200, result.getResponse().getStatus());
    }

    @WithMockUser(value = "test")
    @Test
    void getAllPostsIntTestUsername() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/posts/allWithUsername")
                .param("pageNumber", "1")
                .param("pageSize", "12");
        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
        assertEquals(200, result.getResponse().getStatus());
    }






}