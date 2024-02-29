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
}
