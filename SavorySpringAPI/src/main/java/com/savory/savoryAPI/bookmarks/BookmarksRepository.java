package com.savory.savoryAPI.bookmarks;

import com.savory.savoryAPI.bookmarks.entity.Bookmarks;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarksRepository extends JpaRepository<Bookmarks, Integer> {

    @Transactional
    @Modifying
    @Query("DELETE FROM Bookmarks WHERE id = :bookmarkId")
    void deleteByBookmarkId(@Param("bookmarkId") int bookmarkId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Bookmarks WHERE userId = :userId")
    void deleteByUserId(@Param("userId") int userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Bookmarks WHERE userId = :userId AND postId = :postId")
    void deleteBookmarkByInputs(@Param("userId") int userId,
                               @Param("postId") int postId);

    @Query("SELECT b FROM Bookmarks b WHERE b.id = :id")
    Optional<Bookmarks> findById(int id);

    @Query("SELECT b FROM Bookmarks b WHERE b.userId = :userId")
    List<Bookmarks> findByUserId(int userId);
}
