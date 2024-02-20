package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.entity.Posts;
import com.savory.savoryAPI.post.entity.PostsUsername;
import com.savory.savoryAPI.person.entity.Person;
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
public interface PostRepository extends JpaRepository<Posts, Long>
{

   //Delete Still Under Construction
   @Transactional
   @Modifying
   @Query("DELETE FROM Posts WHERE post_id = :post_id")
   void deleteByPost_id(@Param("post_id") int post_id);
   @Query("SELECT p FROM Posts p WHERE p.post_id = :post_id")
   Optional<Posts> findByPost_id(@Param("post_id") int post_id);

   @Query("SELECT p FROM Posts p WHERE p.post_id IN :ids")
   List<Posts> findAllByPost_idIn(@Param("ids") Collection<Integer> ids);

   @Query("SELECT p FROM Posts p WHERE p.userID = :userID")
   List<Posts> findByUserID(@Param("userID") int userID);


}




