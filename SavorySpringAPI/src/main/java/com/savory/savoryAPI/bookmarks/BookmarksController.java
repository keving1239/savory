package com.savory.savoryAPI.bookmarks;

import com.savory.savoryAPI.bookmarks.dto.BookmarksDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/bookmarks")
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

    @PostMapping("/postBookmark")
    public BookmarksDto createBookmark(@RequestBody BookmarksDto bookmarkDto) {
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