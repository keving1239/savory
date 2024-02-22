package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.entity.PostsUsername;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

import org.springframework.stereotype.Repository;


@Repository
public interface PostsURepository extends JpaRepository<PostsUsername, Integer> {

    @Query("SELECT NEW com.savory.savoryAPI.post.entity.PostsUsername(p.postId, p.userID, p.headline, p.ingredients, p.recipe, p.img, p.tags, p.postdate, u.username) FROM Posts p JOIN Person u ON p.userID = u.id")
    List<PostsUsername> findPostAndUsername(int limit);
}

