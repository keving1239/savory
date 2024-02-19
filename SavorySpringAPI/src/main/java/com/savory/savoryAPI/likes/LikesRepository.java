package com.savory.savoryAPI.likes;


import com.savory.savoryAPI.likes.entity.Likes;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Integer> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Likes WHERE id = :likeId")
    void deleteByLikeId(@Param("likeId") int likeId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Likes WHERE userId = :userId")
    void deleteByUserId(@Param("userId") int userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Likes WHERE userId = :userId AND postId = :postId")
    void deleteLikeByInputs(@Param("userId") int userId,
                                @Param("postId") int postId);

    @Query("SELECT b FROM Likes b WHERE b.id = :id")
    Optional<Likes> findById(int id);

    @Query("SELECT b FROM Likes b WHERE b.userId = :userId")
    List<Likes> findByUserId(int userId);

    @Query("SELECT COUNT(*) FROM Likes b WHERE b.postId = :postId")
    Integer getLikesCount(int postId);
}
