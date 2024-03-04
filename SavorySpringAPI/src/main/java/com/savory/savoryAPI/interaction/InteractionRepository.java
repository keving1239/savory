package com.savory.savoryAPI.interaction;


import com.savory.savoryAPI.interaction.entity.Interaction;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction, Integer> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Interaction WHERE id = :id")
    void deleteById(@Param("id") int id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Interaction WHERE userId = :uid")
    void deleteByUserId(@Param("uid") int uid);

    @Transactional
    @Modifying
    @Query("DELETE FROM Interaction WHERE userId = :uid AND postId = :pid")
    void deleteByInputs(@Param("uid") int uid, @Param("pid") int pid);

    @Query("SELECT i FROM Interaction i WHERE i.userId = :uid AND i.postId = :pid")
    Optional<Interaction> findByInputs(int uid, int pid);

    @Query("SELECT i FROM Interaction i WHERE i.id = :id")
    Optional<Interaction> findById(int id);

    @Query("SELECT i FROM Interaction i WHERE i.userId = :uid")
    List<Interaction> findByUserId(int uid);

    @Query("SELECT COUNT(*) FROM Interaction i WHERE i.postId = :pid AND i.isLiked = true")
    Integer getLikeCount(int pid);

    @Query("SELECT COUNT(*) FROM Interaction i WHERE i.postId = :pid AND i.isBookmarked = true")
    Integer getBookmarkCount(int pid);
    @Query("SELECT COUNT(*) FROM Interaction i WHERE i.postId = :pid AND i.isShared = true")
    Integer getShareCount(int pid);
    @Query("SELECT SUM(totals.likes + totals.shares + totals.bookmarks) AS metric FROM (SELECT SUM(CASE WHEN i.isLiked = TRUE THEN 1 ELSE 0 END) AS likes, SUM(CASE WHEN i.isShared = TRUE THEN 1 ELSE 0 END) as shares, SUM(CASE WHEN i.isBookmarked = TRUE THEN 1 ELSE 0 END) as bookmarks FROM Interaction i WHERE i.postId in (Select p.postId from Posts p where p.userId = :uid) GROUP BY i.postId) AS totals")
    Integer getInteractionCount(int uid);
}
