package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.entity.Posts;
import com.savory.savoryAPI.post.entity.PostsUsername;
import com.savory.savoryAPI.person.entity.Person;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


@Repository
public interface PostRepository extends JpaRepository<Posts, Integer>
{
   @Transactional
   @Modifying
   @Query("DELETE FROM Posts WHERE postId = :postId")
   void deleteByPostId(@Param("postId") Integer postId);
   @Query("SELECT p FROM Posts p WHERE p.postId = :postId")
   Optional<Posts> findByPostId(@Param("postId") Integer postId);

   @Query("SELECT p FROM Posts p WHERE p.postId IN :ids")
   List<Posts> findAllByPostIdIn(@Param("ids") Collection<Integer> ids);

   @Query("SELECT p FROM Posts p WHERE p.userId = :userId")
   List<Posts> findByUserId(@Param("userId") Integer userId, Pageable pageable);


}




