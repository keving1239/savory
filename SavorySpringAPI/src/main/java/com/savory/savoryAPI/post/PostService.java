package com.savory.savoryAPI.post;

import com.savory.savoryAPI.post.util.PostsUtil;
import com.savory.savoryAPI.post.dto.PostsDto;
import com.savory.savoryAPI.post.entity.Posts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService
{
    private final Logger log = LoggerFactory.getLogger(PostService.class);
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<PostsDto> findAllPosts()
    {
        return postRepository.findAll().stream()
                .map(PostsUtil::buildPostDto)
                .collect(Collectors.toList());
    }

    public List<Posts> findPosts(List<Long> ids) {
        return postRepository.findAllByPost_idIn(ids);
    }

//    public SuperPowerDto updateSuperPort(SuperPowerDto superPowerDto, Long superPowerKey) {
//        var existingSuperPower = superPowerRepository.findByKey(superPowerKey)
//                .orElseThrow(() -> {
//                    log.warn("Unable to find super power with id {} while trying to update", superPowerKey);
//                    return new SuperHeroApiException("Could not find super power with id " + superPowerKey, HttpStatus.BAD_REQUEST);
//                });
//        var updatedPower = reify(superPowerDto, existingSuperPower);
//        var savedPower = superPowerRepository.save(updatedPower);
//        return SuperPowerUtil.buildSuperPowerDto(savedPower);
//    }

    public PostsDto updatePostPort(PostsDto postsDto, Long post_id)
    {
        var existingPost = postRepository.findByPost_id(post_id).orElseThrow(() -> {
                    log.warn("Unable to find super power with id {} while trying to update", post_id);
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


}