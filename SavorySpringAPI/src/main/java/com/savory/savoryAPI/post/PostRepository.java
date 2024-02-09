package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Posts, Integer>
{
   Optional<Posts>findById(int id);
   List<Posts> findAllByIdIn(Collection<Long> id);
}

