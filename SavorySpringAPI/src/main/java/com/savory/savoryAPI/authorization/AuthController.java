package com.savory.savoryAPI.authorization;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://savory.azurewebsites.net/login"})
@RequestMapping("/api/auth")
public class AuthController {
    @GetMapping("/isAdmin")
    public Boolean isAdmin(Authentication auth) {
        return auth != null && auth.isAuthenticated() &&
            auth.getAuthorities().stream().anyMatch(
                    authority -> authority.getAuthority().equals("ADMIN")
            );
    }
}
