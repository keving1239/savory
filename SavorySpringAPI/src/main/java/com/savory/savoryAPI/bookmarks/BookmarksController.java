package com.savory.savoryAPI.bookmarks;

import com.savory.savoryAPI.bookmarks.dto.BookmarksDto;
import com.savory.savoryAPI.bookmarks.dto.BuildBookmarksRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/bookmarks")
public class BookmarksController {

    private final BookmarksService bookmarksService;

    @Autowired
    public BookmarksController(BookmarksService bookmarksService) {
        this.bookmarksService = bookmarksService;
    }

    @GetMapping
    public List<BookmarksDto> getAllBookmarks() {
        return bookmarksService.findAllBookmarks();
    }

    @GetMapping("/users/{userId}")
    public List<BookmarksDto> getBookmarksById(@PathVariable int userId) {
        return bookmarksService.findBookmarksByUser(userId);
    }

    @GetMapping("/posts/{postId}")
    public Integer getBookmarkCount(@PathVariable int postId) {
        return bookmarksService.getBookmarksCount(postId);
    }

    @PostMapping("/postBookmark")
    public BookmarksDto createBookmark(@RequestBody BuildBookmarksRequest bookmarkDto) {
        return bookmarksService.createBookmark(bookmarkDto);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteBookmarkById(@PathVariable int id) {
        bookmarksService.deleteBookmarkById(id);
    }

    @DeleteMapping("/deleteByInputs/{userId}/{postId}")
    public void deleteBookmarkByInputs(@PathVariable int userId, @PathVariable int postId) {
        bookmarksService.deleteBookmarkByInputs(userId, postId);
    }

    @DeleteMapping("/deleteByUserId/{userId}")
    public void deleteBookmarkByUserId(@PathVariable int userId) {
        bookmarksService.deleteBookmarkById(userId);
    }


}