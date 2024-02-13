package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.dto.PostsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

//    @GetMapping
//    public List<PostsDto> createSuperPower() {
//        return superPowerService.findAllSuperPowers();
//    }
    @GetMapping
    public List<PostsDto> createPost()
    {
        return postService.findAllPosts();
    }

    @GetMapping("/byUserId")
    public List<PostsDto> getUserPosts(Long userID)
    {
        return postService.findPostByUserID(userID);
    }

    @GetMapping("/postID")
    public PostsDto getPostbyPostID(Long post_id)
    {
        return postService.findPostbyPostID(post_id);
    }

    @DeleteMapping("/byPostID")
    public void deletePostbyPostID(Long post_id)
    {
        postService.deletePostByPId(post_id);
    }



    //    @PostMapping
//    public ResponseEntity<SuperPowerDto> createSuperPower(@RequestBody SuperPowerDto superPowerDto) {
//        var superPower = superPowerService.createSuperPower(superPowerDto);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(superPower);
//    }
    @PostMapping
    public ResponseEntity<PostsDto> createPost(@RequestBody PostsDto postsDto)
    {
        var post = postService.createPost(postsDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

//    @PutMapping
//    public ResponseEntity<SuperPowerDto> updateSuperPower(@RequestBody SuperPowerDto superPowerDto, @RequestParam(value = "key") Long key) {
//        var superPower = superPowerService.updateSuperPort(superPowerDto, key);
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(superPower);
//    }
    @PutMapping
    public ResponseEntity<PostsDto> updatePost(@RequestBody PostsDto postsDto, @RequestParam(value = "postId") Long post_id)
    {
        var post = postService.updatePostPort(postsDto, post_id);
        return ResponseEntity.status(HttpStatus.OK).body(post);
    }
}