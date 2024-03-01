package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.dto.BuildPostRequest;
import com.savory.savoryAPI.post.dto.PostsUsernameDto;
import com.savory.savoryAPI.post.entity.PostsUsername;
import com.savory.savoryAPI.post.util.PostsUtil;
import com.savory.savoryAPI.post.dto.PostsDto;
import com.savory.savoryAPI.post.entity.Posts;
import com.sun.jna.platform.win32.Sspi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService
{
    private final PostRepository postRepository;
    private final PostsURepository postsURepository;

    @Autowired
    public PostService(PostRepository postRepository, PostsURepository postsURepository) {
        this.postRepository = postRepository;
        this.postsURepository = postsURepository;
    }

    public List<PostsDto> findAllPosts() {
        return postRepository.findAll().stream()
                .map(PostsUtil::buildPostDto)
                .collect(Collectors.toList());
    }

    public List<PostsUsernameDto> findPostAndUsername(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("postId").descending());
        List<PostsUsername> posts = postsURepository.findPostAndUsername(pageable);
        return posts.stream()
                    .map(PostsUtil::buildPostUsernameDto)
                    .collect(Collectors.toList());
    }

    public List<PostsUsernameDto> findBookmarks(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("postId").descending());
        List<PostsUsername> posts = postsURepository.findBookmarks(userId, pageable);
        return posts.stream()
                .map(PostsUtil::buildPostUsernameDto)
                .collect(Collectors.toList());
    }

    public List<PostsUsernameDto> findSearchedPosts(String query, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("postId").descending());
        List<Object[]> search = postsURepository.findSearchedPosts(query, pageable);
        List<PostsUsername> posts = search.stream().map((row) -> {
            int postId = (int) row[0], userId = (int) row[1];
            String headline = (String) row[2], ingredients = (String) row[3], recipe = (String) row[4];
            String img = (String) row[5], tags = (String) row[6], username = (String) row[8];
            Timestamp postdate = (Timestamp) row[7];
            return new PostsUsername(postId,userId,headline,ingredients,recipe,img,tags,postdate,username);
        }).toList();
        return posts.stream()
                .map(PostsUtil::buildPostUsernameDto)
                .collect(Collectors.toList());
    }

    public List<Posts> findPosts(List<Integer> ids) {
        return postRepository.findAllByPostIdIn(ids);
    }

    public List<PostsDto> findPostByUserId(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("postId").descending());
        List<Posts> posts = postRepository.findByUserId(userId, pageable);
        return posts.stream()
                .map(PostsUtil::buildPostDto)
                .collect(Collectors.toList());
    }

    public Boolean deletePost(Integer postId) {
        if(!postRepository.existsById(postId)) return false;
        postRepository.deleteByPostId(postId);
        return !postRepository.existsById(postId);
    }

    public PostsDto findPostByPostID(int postId) {
        var existingPost = postRepository.findByPostId(postId).orElse(null);
        if(existingPost == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Post with id " + postId + " not found");
        return PostsUtil.buildPostDto(existingPost);

    }

    public PostsUsernameDto updatePost(BuildPostRequest request, int postId) {
        var oldPost = postRepository.findByPostId(postId).orElse(null);
        if(oldPost == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Post with id " + postId + " not found");
        var newPost = reify(request, oldPost);
        var newPostU = postsURepository.retrievePostAndUsername(postId);
        return PostsUtil.buildPostUsernameDto(newPostU);
    }


    public PostsUsernameDto createPost(BuildPostRequest request) {
        var post = reify(request, new Posts());
        var postU = postsURepository.retrievePostAndUsername(post.getPostId());
        return PostsUtil.buildPostUsernameDto(postU);
    }

    private Posts reify(BuildPostRequest request, Posts target) {
        Date clock = new Date();
        Timestamp time = new Timestamp(clock.getTime());
        target.setUserId(request.getUserId());
        target.setHeadline(request.getHeadline());
        target.setIngredients(request.getIngredients()
            .replaceAll("\n",", ")
            .replaceAll(", ",","));
        target.setRecipe(request.getRecipe());
        target.setImg(request.getImg());
        target.setTags(request.getTags()
            .replaceAll("#",""));
        target.setPostdate(time);
        return postRepository.save(target);
    }
}