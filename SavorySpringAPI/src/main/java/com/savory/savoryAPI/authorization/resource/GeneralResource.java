package com.savory.savoryAPI.authorization.resource;

import org.springframework.http.MediaType;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.savory.savoryAPI.authorization.service.AuthenticationService;
import com.savory.savoryAPI.authorization.service.JwtService;
import com.savory.savoryAPI.authorization.model.UserCreds;

import lombok.AllArgsConstructor;


@RestController
@AllArgsConstructor
public class GeneralResource {
    
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @PostMapping(path = "/login", 
        consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public String login(UserCreds userCredentials) {
        if (authenticationService.isValidUser(userCredentials)){
            return jwtService.getJwtForUser(userCredentials.getEmail());
        } else {
            return "Not valid user.";
        }
    }

    @GetMapping("/protected")
    public String getProtectedResource(@RequestHeader("Authorization") String bearerToken) {
        String jwt = jwtService.getTokenFromHeader(bearerToken);
        if (jwtService.isValidJwt(jwt)) {
            return "You got the protected resource.";
        } else {
            return "Not valid token";
        }
    }

}