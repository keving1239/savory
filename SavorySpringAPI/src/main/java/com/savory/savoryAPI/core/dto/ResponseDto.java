package com.savory.savoryAPI.core.dto;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class ResponseDto {
    String message;
}