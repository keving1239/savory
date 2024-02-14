package com.savory.savoryAPI.bookmarks;

import java.util.List;
import java.util.stream.Collectors;

import com.savory.savoryAPI.bookmarks.dto.BookmarksDto;
import com.savory.savoryAPI.bookmarks.entity.Bookmarks;
import com.savory.savoryAPI.bookmarks.util.BookmarksUtil;
import com.savory.savoryAPI.core.exception.BookmarkException;
import com.savory.savoryAPI.person.entity.Person;
import com.savory.savoryAPI.post.entity.Posts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class BookmarksService {
    
    private final Logger log = LoggerFactory.getLogger(BookmarksService.class);

    private final BookmarksRepository bookmarksRepository;

    @Autowired
    public BookmarksService(BookmarksRepository bookmarksRepository) {
        this.bookmarksRepository = bookmarksRepository;
    }

    public BookmarksDto updateBookmark(BookmarksDto bookmarksDto, int id, int postId, int userId) {
        var bookmark = bookmarksRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Could not find bookmark for post {} from user {}", postId, userId);
                    return new BookmarkException("Could not find bookmark with id " + id, HttpStatus.BAD_REQUEST);
                });
        var updatedBookmark = reify(bookmarksDto, bookmark);
        var savedBookmark = bookmarksRepository.save(updatedBookmark);
        return BookmarksUtil.buildBookmarksDto(savedBookmark);
    }

    public BookmarksDto createBookmark(BookmarksDto bookmarkDto) {
        var bookmark = reify(bookmarkDto, new Bookmarks());
        var savedBookmark = bookmarksRepository.save(bookmark);

        return BookmarksUtil.buildBookmarksDto(savedBookmark);
    }

    private Bookmarks reify(BookmarksDto bookmarkDto, Bookmarks target) {
        target.setPostId(bookmarkDto.getPostId());
        target.setUserId(bookmarkDto.getUserId());
        return bookmarksRepository.save(target);
    }

    public void deleteBookmarkById(int bookmarkId)
    {
        bookmarksRepository.deleteByBookmarkId(bookmarkId);

    }

    public void deleteBookmarkByUserId(int userId)
    {
        bookmarksRepository.deleteByBookmarkId(userId);

    }

    public void deleteBookmarkByInputs(int userId, int postId)
    {
        bookmarksRepository.deleteBookmarkByInputs(userId, postId);

    }

    public List<BookmarksDto> findAllBookmarks() {
        return bookmarksRepository.findAll()
                .stream()
                .map(BookmarksUtil::buildBookmarksDto)
                .collect(Collectors.toList());
    }
}
