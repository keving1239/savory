package com.savory.savoryAPI.bookmarks;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.savory.savoryAPI.bookmarks.dto.BookmarksDto;

@ExtendWith(SpringExtension.class)
class BookmarksControllerTest {
    
    private BookmarksController bookmarksController;
    private BookmarksService bookmarksService;

    @BeforeEach
    public void setup() {
        bookmarksService = mock(BookmarksService.class);
        bookmarksController = new BookmarksController(bookmarksService);
    }

    @Test
    void getBookmarksIfIDIsInSet() {
        //Arrange
        int bookmarkUserId = 3;
        BookmarksDto bookmarksDtoOne =  createExpecteBookmarksDto(1, 4, bookmarkUserId);
        BookmarksDto bookmarksDtoTwo =  createExpecteBookmarksDto(2, 5, bookmarkUserId);
        List<BookmarksDto> expectedBookmarks = Arrays.asList(
            bookmarksDtoOne, bookmarksDtoTwo
        );
        //Mock
        when(bookmarksService.findBookmarksByUser(eq(bookmarkUserId))).thenReturn(expectedBookmarks);
        //Act
        List<BookmarksDto> actualBookmarks = bookmarksController.getBookmarksById(bookmarkUserId);
        //Assert
        assertEquals(expectedBookmarks, actualBookmarks);
        //Verify
        verify(bookmarksService, times(1)).findBookmarksByUser(bookmarkUserId);
    }

    @Test
    void getBookmarkTotalBookmarkCount() {
        BookmarksDto bookmarksDtoOne =  createExpecteBookmarksDto(1, 4, 2);
        BookmarksDto bookmarksDtoTwo = createExpecteBookmarksDto(2, 6, 3);
        BookmarksDto bookmarksDtoThree = createExpecteBookmarksDto(3, 1, 1);
        List<BookmarksDto> expectedBookmarks = Arrays.asList(
            bookmarksDtoOne, bookmarksDtoTwo, bookmarksDtoThree
        );
        //Mock
        when(bookmarksService.findAllBookmarks()).thenReturn(expectedBookmarks);
        //Act
        List<BookmarksDto> actualBookmarks = bookmarksController.getAllBookmarks();
        //Assert
        assertEquals(expectedBookmarks, actualBookmarks);
        //Verify
        verify(bookmarksService, times(1)).findAllBookmarks();

    }

    private BookmarksDto createExpecteBookmarksDto(int id, int postId, int userId) {
        return BookmarksDto.builder()
                .id(id)
                .postId(postId)
                .userId(userId)
                .build();
    }
}
