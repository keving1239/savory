package com.savory.savoryAPI.person.dto;
import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class BuildPersonRequest {
    String username;
    String email;
    String img;
    String bio;
}
