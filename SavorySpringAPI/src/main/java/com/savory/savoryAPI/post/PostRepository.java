package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


@Repository
public interface PostRepository extends JpaRepository<Posts, Long> {
   @Query("SELECT p FROM Posts p WHERE p.post_id = :post_id")
   Optional<Posts> findByPost_id(@Param("post_id") Long post_id);

   @Query("SELECT p FROM Posts p WHERE p.post_id IN :ids")
   List<Posts> findAllByPost_idIn(@Param("ids") Collection<Long> ids);

}


