package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.dto.PostsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    //Change Path names for more specifics and add {} for parameters(e.g {username} for when api needs username.

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

//    @GetMapping
//    public List<PostsDto> createSuperPower() {
//        return superPowerService.findAllSuperPowers();
//    }
    @GetMapping("/all")
    public List<PostsDto> createPost()
    {
        return postService.findAllPosts();
    }

    @GetMapping("/byUserId/{userID}")
    public List<PostsDto> getUserPosts(int userID)
    {
        return postService.findPostByUserID(userID);
    }

    @GetMapping("/postID/{post_id}")
    public PostsDto getPostbyPostID(int post_id)
    {
        return postService.findPostbyPostID(post_id);
    }

    @DeleteMapping("/byPostID/{post_id}")
    public void deletePostbyPostID(int post_id)
    {
        postService.deletePostByPId(post_id);
    }



    //    @PostMapping
//    public ResponseEntity<SuperPowerDto> createSuperPower(@RequestBody SuperPowerDto superPowerDto) {
//        var superPower = superPowerService.createSuperPower(superPowerDto);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(superPower);
//    }
    @PostMapping("/addNewPost")
    public ResponseEntity<PostsDto> createPost(@RequestBody PostsDto postsDto)
    {
        var post = postService.createPost(postsDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

//    @PostMapping("/userID")
//    public ResponseEntity<PostsDto>createPostByUserID(@RequestBody PostsDto postsDto, Long userID)
//    {
//        var post = postService.createPostbyUserID(postsDto, userID);
//        return ResponseEntity.status(HttpStatus.CREATED).body(post);
//    }

//    @PutMapping
//    public ResponseEntity<SuperPowerDto> updateSuperPower(@RequestBody SuperPowerDto superPowerDto, @RequestParam(value = "key") Long key) {
//        var superPower = superPowerService.updateSuperPort(superPowerDto, key);
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(superPower);
//    }
    @PutMapping
    public ResponseEntity<PostsDto> updatePost(@RequestBody PostsDto postsDto, @RequestParam(value = "postId") int post_id)
    {
        var post = postService.updatePostPort(postsDto, post_id);
        return ResponseEntity.status(HttpStatus.OK).body(post);
    }
}