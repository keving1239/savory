package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.entity.PostsUsername;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

import org.springframework.stereotype.Repository;


@Repository
public interface PostsURepository extends JpaRepository<PostsUsername, Integer> {


    @Query("SELECT NEW com.savory.savoryAPI.post.entity.PostsUsername(p.postId, p.userID, p.headline, p.ingredients, p.recipe, p.img, p.tags, p.postdate, u.username) FROM Posts p JOIN Person u ON p.userID = u.id")
    List<PostsUsername> findPostAndUsername(Pageable pageable);

    @Query("SELECT NEW com.savory.savoryAPI.post.entity.PostsUsername(p.postId, p.userID, p.headline, p.ingredients, p.recipe, p.img, p.tags, p.postdate, u.username) FROM Posts p JOIN Person u ON p.userID = u.id WHERE p.postId IN (SELECT i.postId FROM Interaction i WHERE i.userId = :userId AND i.isBookmarked = true)")
    List<PostsUsername> findBookmarks(int userId);

}

