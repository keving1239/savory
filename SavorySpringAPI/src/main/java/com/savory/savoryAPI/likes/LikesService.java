package com.savory.savoryAPI.likes;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import com.savory.savoryAPI.likes.dto.LikesDto;
import com.savory.savoryAPI.likes.dto.BuildLikesRequest;
import com.savory.savoryAPI.likes.entity.Likes;
import com.savory.savoryAPI.likes.util.LikesUtil;
import org.springframework.stereotype.Service;

@Service
public class LikesService {
    private final LikesRepository likesRepository;

    @Autowired
    public LikesService(LikesRepository likesRepository) {
        this.likesRepository = likesRepository;
    }

    public LikesDto createLike(BuildLikesRequest likeDto) {
        var like = reify(likeDto, new Likes());
        var savedLike = likesRepository.save(like);

        return LikesUtil.buildLikesDto(savedLike);
    }

    private Likes reify(BuildLikesRequest likeDto, Likes target) {
        target.setPostId(likeDto.getPostId());
        target.setUserId(likeDto.getUserId());
        return likesRepository.save(target);
    }

    public void deleteLikeById(int likeId)
    {
        likesRepository.deleteByLikeId(likeId);

    }

    public void deleteLikeByInputs(int userId, int postId)
    {
        likesRepository.deleteLikeByInputs(userId, postId);

    }

    public List<LikesDto> findAllLikes() {
        return likesRepository.findAll()
                .stream()
                .map(LikesUtil::buildLikesDto)
                .collect(Collectors.toList());
    }

    public List<LikesDto> findLikesByUser(int userId) {
        return likesRepository.findByUserId(userId)
                .stream()
                .map(LikesUtil::buildLikesDto)
                .collect(Collectors.toList());
    }

    public Integer getLikesCount(int postId) {
        return likesRepository.getLikesCount(postId);
    }
}
