package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.dto.PostsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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