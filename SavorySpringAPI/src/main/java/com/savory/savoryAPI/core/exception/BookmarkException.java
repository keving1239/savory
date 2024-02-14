package com.savory.savoryAPI.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public class BookmarkException extends RuntimeException {

    private HttpStatus responseStatus;
    public BookmarkException(String message, HttpStatus responseStatus) {
        super(message);
        this.responseStatus = responseStatus;
    }

}