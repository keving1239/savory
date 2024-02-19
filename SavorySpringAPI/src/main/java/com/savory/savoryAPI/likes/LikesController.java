package com.savory.savoryAPI.likes;

import com.savory.savoryAPI.likes.dto.LikesDto;
import com.savory.savoryAPI.likes.dto.BuildLikesRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "http://localhost:3000")
public class LikesController {
    private final LikesService likesService;

    @Autowired
    public LikesController(LikesService likesService) {
        this.likesService = likesService;
    }

    @GetMapping
    public List<LikesDto> getAllLikes() {
        return likesService.findAllLikes();
    }

    @GetMapping("/users/{userId}")
    public List<LikesDto> getLikesById(@PathVariable int userId) {
        return likesService.findLikesByUser(userId);
    }

    @GetMapping("/posts/{postId}")
    public Integer getLikeCount(@PathVariable int postId) {
        return likesService.getLikesCount(postId);
    }

    @PostMapping("/postLike")
    public LikesDto createLike(@RequestBody BuildLikesRequest likeDto) {
        return likesService.createLike(likeDto);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteLikeById(@PathVariable int id) {
        likesService.deleteLikeById(id);
    }

    @DeleteMapping("/deleteByInputs/{userId}/{postId}")
    public void deleteLikeByInputs(@PathVariable int userId, @PathVariable int postId) {
        likesService.deleteLikeByInputs(userId, postId);
    }

    @DeleteMapping("/deleteByUserId/{userId}")
    public void deleteLikeByUserId(@PathVariable int userId) {
        likesService.deleteLikeById(userId);
    }
}
