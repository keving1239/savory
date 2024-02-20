package com.savory.savoryAPI.bookmarks;

import java.util.List;
import java.util.stream.Collectors;

import com.savory.savoryAPI.bookmarks.dto.BookmarksDto;
import com.savory.savoryAPI.bookmarks.dto.BuildBookmarksRequest;
import com.savory.savoryAPI.bookmarks.entity.Bookmarks;
import com.savory.savoryAPI.bookmarks.util.BookmarksUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookmarksService {
    
    // private final Logger log = LoggerFactory.getLogger(BookmarksService.class);

    private final BookmarksRepository bookmarksRepository;

    @Autowired
    public BookmarksService(BookmarksRepository bookmarksRepository) {
        this.bookmarksRepository = bookmarksRepository;
    }

    public BookmarksDto createBookmark(BuildBookmarksRequest bookmarkDto) {
        var bookmark = reify(bookmarkDto, new Bookmarks());
        var savedBookmark = bookmarksRepository.save(bookmark);

        return BookmarksUtil.buildBookmarksDto(savedBookmark);
    }

    private Bookmarks reify(BuildBookmarksRequest bookmarkDto, Bookmarks target) {
        target.setPostId(bookmarkDto.getPostId());
        target.setUserId(bookmarkDto.getUserId());
        return bookmarksRepository.save(target);
    }

    public void deleteBookmarkById(int bookmarkId)
    {
        bookmarksRepository.deleteByBookmarkId(bookmarkId);

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

    public List<BookmarksDto> findBookmarksByUser(int userId) {
        return bookmarksRepository.findByUserId(userId)
                .stream()
                .map(BookmarksUtil::buildBookmarksDto)
                .collect(Collectors.toList());
    }

    public Integer getBookmarksCount(int postId) {
        return bookmarksRepository.getBookmarksCount(postId);
    }
}
