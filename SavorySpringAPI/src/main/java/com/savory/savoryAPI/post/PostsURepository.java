package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.entity.PostsUsername;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Repository;


@Repository
public interface PostsURepository extends JpaRepository<PostsUsername, Integer> {


    @Query("SELECT NEW com.savory.savoryAPI.post.entity.PostsUsername(p.postId, p.userId, p.headline, p.ingredients, p.recipe, p.img, p.tags, p.postdate, u.username) FROM Posts p JOIN Person u ON p.userId = u.id")
    List<PostsUsername> findPostAndUsername(Pageable pageable);

    @Query("SELECT NEW com.savory.savoryAPI.post.entity.PostsUsername(p.postId, p.userId, p.headline, p.ingredients, p.recipe, p.img, p.tags, p.postdate, u.username) FROM Posts p JOIN Person u ON p.userId = u.id WHERE p.postId IN (SELECT i.postId FROM Interaction i WHERE i.userId = :userId AND i.isBookmarked = true)")
    List<PostsUsername> findBookmarks(int userId, Pageable pageable);

    @Query(value = "SELECT p.postId, p.userId, p.headline, p.ingredients, p.recipe, p.img, p.tags, p.postdate, u.username FROM Posts p JOIN Person u ON p.userId = u.id WHERE EXISTS (SELECT 1 FROM STRING_SPLIT(p.tags, ',') WHERE value IN (SELECT value FROM STRING_SPLIT(:query, ' '))) OR EXISTS (SELECT 1 FROM STRING_SPLIT(p.headline, ' ') WHERE value IN (SELECT value FROM STRING_SPLIT(:query, ' ')))", nativeQuery = true)
    List<Object[]> findSearchedPosts(String query, Pageable pageable);
    @Query("SELECT NEW com.savory.savoryAPI.post.entity.PostsUsername(p.postId, p.userId, p.headline, p.ingredients, p.recipe, p.img, p.tags, p.postdate, u.username) FROM Posts p JOIN Person u ON p.userId = u.id WHERE p.postId = :postId")
    PostsUsername retrievePostAndUsername(int postId);

}

