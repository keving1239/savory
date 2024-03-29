package com.savory.savoryAPI.post;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.savory.savoryAPI.post.dto.BuildPostRequest;
import com.savory.savoryAPI.post.dto.PostsDto;
import com.savory.savoryAPI.post.dto.PostsUsernameDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public Sort sortBy = Sort.by("postId").descending();

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
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "12") int pageSize) {
        return postService.findPostAndUsername(pageNumber, pageSize, sortBy);
    }
    @GetMapping("/bookmarked/{userId}")
    public List<PostsUsernameDto> getBookmarks(@PathVariable("userId") int userId,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "12") int pageSize) {
        return postService.findBookmarks(userId, pageNumber, pageSize);
    }
    @GetMapping("/search")
    public List<PostsUsernameDto> getSearchedPosts(@RequestParam("query") String query,
           @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
           @RequestParam(value = "pageSize", defaultValue = "12") int pageSize) {
        return postService.findSearchedPosts(query, pageNumber, pageSize);
    }

    @PostMapping("/updateSort")
    public void updateSort(@RequestParam String sorter) {
        if (sorter.equals("newest")) {
            sortBy = Sort.by("postId").descending();
        } else if (sorter.equals("oldest")){
            sortBy = Sort.by("postId").ascending();
        } else if (sorter.equals("A")){
            sortBy = Sort.by("headline").ascending();
        } else {
            sortBy = Sort.by("headline").descending();
        }
    }
    @GetMapping("/byUserId/{userId}")
    public List<PostsDto> getUserPosts(@PathVariable int userId,
           @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
           @RequestParam(value = "pageSize", defaultValue = "12") int pageSize) {
        return postService.findPostByUserId(userId, pageNumber, pageSize);
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