package com.savory.savoryAPI.post;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.savory.savoryAPI.post.dto.BuildPostRequest;
import com.savory.savoryAPI.post.dto.PostsDto;
import com.savory.savoryAPI.post.dto.PostsUsernameDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/all")
    public List<PostsDto> findAllPosts() {
        return postService.findAllPosts();
    }
    @GetMapping("/allWithUsername")
    public List<PostsUsernameDto> getFeed(
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "12") int pageSize) {
        return postService.findPostAndUsername(pageNumber, pageSize);
    }
    @GetMapping("/bookmarked/{userId}")
    public List<PostsUsernameDto> getBookmarks(@PathVariable("userId") int userId) {
        return postService.findBookmarks(userId);
    }
    @GetMapping("/search/{query}")
    public List<PostsUsernameDto> getSearchedPosts(@PathVariable("query") String query,
           @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
           @RequestParam(value = "pageSize", defaultValue = "12") int pageSize) {
        return postService.findSearchedPosts(query, pageNumber, pageSize);
    }
    @GetMapping("/byUserId/{userId}")
    public List<PostsDto> getUserPosts(@PathVariable int userId)
    {
        return postService.findPostByUserId(userId);
    }
    @GetMapping("/byPostID/{postId}")
    public PostsDto getPostByPostID(@PathVariable("postId") int postId) {
        return postService.findPostByPostID(postId);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable("postId") Integer postId) {
        return (postService.deletePost(postId)) ?
            ResponseEntity.ok("Post with id " + postId + " deleted") :
            ResponseEntity.status(HTTPResponse.SC_NOT_FOUND).body("Post with id " + postId + " not found.");
    }

    @PostMapping("/new")
    public PostsUsernameDto createPost(@RequestBody BuildPostRequest request) {
        return postService.createPost(request);
    }

    @PutMapping("/edit/{postId}")
    public PostsUsernameDto updatePost(@RequestBody BuildPostRequest request, @PathVariable("postId") int postId) {
        return postService.updatePost(request, postId);
    }
}