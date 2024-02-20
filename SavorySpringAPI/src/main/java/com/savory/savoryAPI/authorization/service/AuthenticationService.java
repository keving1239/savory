package com.savory.savoryAPI.authorization.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.savory.savoryAPI.authorization.model.UserCreds;
import com.google.common.hash.Hashing;

import java.util.List;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

@Slf4j
@Service
@AllArgsConstructor
public class AuthenticationService {

    private static final String userEmail = "test@email.com";

    // password is "password"
    private static final String password = "6578ce7330bc188b87ea57cabcc9e7be27400d948434de567fd7777b367ed792";
    private static final String passwordSalt = "4531061444497017315";

    private static final List<String> userRoles = List.of("USER");

    private final SecureRandom saltGenerator = new SecureRandom();

    // public void createUser(UserCreds userCredentials) {
    // String salt = String.valueOf(saltGenerator.nextLong());

    // String hashedPassword = Hashing.sha256()
    //         .hashString(salt + userCredentials.getPassword(), StandardCharsets.UTF_8)
    //         .toString();

    // // Save user and salted+hashed password to db, along with the salt
    // }

    public boolean isValidUser(UserCreds userCreds) {
        //find user by email

        String hashedPassword = Hashing.sha256()
            .hashString(passwordSalt + userCreds.getPassword(), StandardCharsets.UTF_8)
            .toString();

        return userCreds.getEmail().equals(userEmail) && hashedPassword.equals(password);
    }

    public List<String> findUserRoles(String userEmail) {
        return userRoles;
    }
}
