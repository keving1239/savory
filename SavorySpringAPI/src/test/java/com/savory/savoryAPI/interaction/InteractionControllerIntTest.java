package com.savory.savoryAPI.interaction;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class InteractionControllerIntTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private InteractionService interactionService;

    @WithMockUser(value="test")
    @Test
    public void testGetAllInteraction() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/interaction/all");

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
        assertEquals(200, result.getResponse().getStatus());

    }
}
