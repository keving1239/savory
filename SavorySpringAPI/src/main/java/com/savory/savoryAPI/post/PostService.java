package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.dto.PostsUsernameDto;
import com.savory.savoryAPI.post.entity.PostsUsername;
import com.savory.savoryAPI.post.util.PostsUtil;
import com.savory.savoryAPI.post.dto.PostsDto;
import com.savory.savoryAPI.post.entity.Posts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService
{
    private final Logger log = LoggerFactory.getLogger(PostService.class);
    private final PostRepository postRepository;

    private final PostsURepository postsURepository;

    @Autowired
    public PostService(PostRepository postRepository, PostsURepository postsURepository) {
        this.postRepository = postRepository;
        this.postsURepository = postsURepository;
    }

    public List<PostsDto> findAllPosts()
    {
        return postRepository.findAll().stream()
                .map(PostsUtil::buildPostDto)
                .collect(Collectors.toList());
    }

    public List<PostsUsernameDto> findPostAndUsername() {
        List<PostsUsername> posts = postsURepository.findPostAndUsername();
        return posts.stream()
                    .map(PostsUtil::buildPostUsernameDto)
                    .collect(Collectors.toList());
        // return postsURepository.findPostAndUsername(limit).stream()
        //         .map(PostsUtil::buildPostUsernameDto)
        //         .collect(Collectors.toList());
    }

    public List<Posts> findPosts(List<Integer> ids) {
        return postRepository.findAllBypostIdIn(ids);
    }

    public List<PostsDto> findPostByUserID(int userID)
    {
        List<Posts> posts = postRepository.findByUserID(userID);
        return posts.stream()
                .map(PostsUtil::buildPostDto)
                .collect(Collectors.toList());
    }

    public void deletePostByPId(int postId)
    {
        postRepository.deleteBypostId(postId);

    }


    public PostsDto findPostbyPostID(int postId)
    {
        var existingPost = postRepository.findBypostId(postId).orElseThrow(() -> {
            log.warn("Unable to find super power with id {} while trying to update", postId);
            return null;
        });
        return PostsUtil.buildPostDto(existingPost);

    }

    public PostsDto updatePostPort(PostsDto postsDto, int postId)
    {
        var existingPost = postRepository.findBypostId(postId).orElseThrow(() -> {
                    log.warn("Unable to find super power with id {} while trying to update", postId);
                    return null;
                });

        var updatedPost = reify(postsDto, existingPost);
        var savedPost = postRepository.save(updatedPost);
        return PostsUtil.buildPostDto(savedPost);
    }


    public PostsDto createPost(PostsDto postsDto) {
        var post = reify(postsDto, new Posts());
        var savedPost = postRepository.save(post);
        return PostsUtil.buildPostDto(savedPost);
    }

    public PostsUsernameDto getUsernames(PostsUsernameDto postsDto) {
        var post = reifyU(postsDto, new PostsUsername());
        var savedPost = postsURepository.save(post);
        return PostsUtil.buildPostUsernameDto(savedPost);
    }

    public PostsDto createPostbyUserID(PostsDto postsDto, int userID) {
        var post = reifyByUserID(postsDto, new Posts(), userID);
        var savedPost = postRepository.save(post);
        return PostsUtil.buildPostDto(savedPost);
    }






    private Posts reify(PostsDto postsDto, Posts target)
    {
        target.setHeadline(postsDto.getHeadline());
        target.setUserID(postsDto.getUserID());
        target.setIngredients(postsDto.getIngredients());
        target.setRecipe(postsDto.getRecipe());
        target.setImg(postsDto.getImg());
        target.setTags(postsDto.getTags());
        target.setPostdate(postsDto.getPostdate());

        return target;
    }

    private PostsUsername reifyU(PostsUsernameDto postsDto, PostsUsername target)
    {
        target.setHeadline(postsDto.getHeadline());
        target.setUserID(postsDto.getUserID());
        target.setIngredients(postsDto.getIngredients());
        target.setRecipe(postsDto.getRecipe());
        target.setImg(postsDto.getImg());
        target.setTags(postsDto.getTags());
        target.setPostdate(postsDto.getPostdate());
        target.setUsername(postsDto.getUsername());

        return target;
    }

    private Posts reifyByUserID(PostsDto postsDto, Posts target, int userID)
    {
        target.setHeadline(postsDto.getHeadline());
        target.setUserID(userID);
        target.setIngredients(postsDto.getIngredients());
        target.setRecipe(postsDto.getRecipe());
        target.setImg(postsDto.getImg());
        target.setTags(postsDto.getTags());
        target.setPostdate(postsDto.getPostdate());

        return target;

    }


}