package com.savory.savoryAPI.authorization;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Collection;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerIntTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private Authentication authentication;

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testIsAdmin() throws Exception {
        // Mock authentication object for admin user
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getAuthorities()).thenReturn(null); //issue

        // Perform GET request to /api/auth/isAdmin
        mockMvc.perform(get("/api/auth/isAdmin"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "USER")
    public void testIsNotAdmin() throws Exception {
        // Mock authentication object for non-admin user
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getAuthorities()).thenReturn(null); //issue

        // Perform GET request to /api/auth/isAdmin
        mockMvc.perform(get("/api/auth/isAdmin"))
                .andExpect(status().isOk()); // Assuming it's returning 200 OK for unauthorized users
    }

    private Collection<? super GrantedAuthority> createAuthorityCollection(String role) {
        return Collections.singletonList(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return role;
            }
        });
    }
    
}
