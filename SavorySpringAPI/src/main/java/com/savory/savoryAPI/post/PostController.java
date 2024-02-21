package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.dto.PostsDto;
import com.savory.savoryAPI.post.dto.PostsUsernameDto;
import com.savory.savoryAPI.post.entity.PostsUsername;
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

    @GetMapping("/all")
    public List<PostsDto> createPost()
    {
        return postService.findAllPosts();
    }

    @GetMapping("/allWithUsername")
    public List<PostsUsernameDto> getUsernames() {return postService.findPostAndUsername();}

    @GetMapping("/byUserId/{userID}")
    public List<PostsDto> getUserPosts(int userID)
    {
        return postService.findPostByUserID(userID);
    }

    @GetMapping("/postID/{postId}")
    public PostsDto getPostbyPostID(int postId)
    {
        return postService.findPostbyPostID(postId);
    }

    @DeleteMapping("/byPostID/{postId}")
    public void deletePostbyPostID(int postId)
    {
        postService.deletePostByPId(postId);
    }

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

//    }
    @PutMapping
    public ResponseEntity<PostsDto> updatePost(@RequestBody PostsDto postsDto, @RequestParam(value = "postId") int postId)
    {
        var post = postService.updatePostPort(postsDto, postId);
        return ResponseEntity.status(HttpStatus.OK).body(post);
    }
}