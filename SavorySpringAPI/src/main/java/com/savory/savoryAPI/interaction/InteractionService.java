package com.savory.savoryAPI.interaction;

import java.util.List;
import java.util.stream.Collectors;

import com.savory.savoryAPI.post.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import com.savory.savoryAPI.interaction.dto.InteractionDto;
import com.savory.savoryAPI.interaction.dto.BuildInteractionRequest;
import com.savory.savoryAPI.interaction.entity.Interaction;
import com.savory.savoryAPI.interaction.util.InteractionUtil;
import org.springframework.stereotype.Service;

@Service
public class InteractionService {
    private final InteractionRepository interactionRepository;
    private final Logger log = LoggerFactory.getLogger(PostService.class);

    @Autowired
    public InteractionService(InteractionRepository interactionRepository) {
        this.interactionRepository = interactionRepository;
    }

    public InteractionDto createInteraction(BuildInteractionRequest interactionRequest) {
        var interaction = reify(interactionRequest, new Interaction());
        return InteractionUtil.buildInteractionDto(interaction);
    }

    private Interaction reify(BuildInteractionRequest interactionRequest, Interaction target) {
        log.debug("Processed request with body: "+interactionRequest.toString());
        target.setPostId(interactionRequest.getPostId());
        target.setUserId(interactionRequest.getUserId());
        target.setLiked(interactionRequest.isLiked());
        target.setBookmarked(interactionRequest.isBookmarked());
        return interactionRepository.save(target);
    }

    public void deleteInteractionById(int interactionId)
    {
        interactionRepository.deleteById(interactionId);

    }

    public void deleteInteractionByInputs(int userId, int postId)
    {
        interactionRepository.deleteByInputs(userId, postId);

    }

    public List<InteractionDto> findAllInteractions() {
        return interactionRepository.findAll()
                .stream()
                .map(InteractionUtil::buildInteractionDto)
                .collect(Collectors.toList());
    }

    public List<InteractionDto> findInteractionsByUserId(int userId) {
        return interactionRepository.findByUserId(userId)
                .stream()
                .map(InteractionUtil::buildInteractionDto)
                .collect(Collectors.toList());
    }

    public Integer getLikeCount(int postId) {
        return interactionRepository.getLikeCount(postId);
    }

    public Integer getBookmarkCount(int postId) {
        return interactionRepository.getBookmarkCount(postId);
    }

    public boolean updateInteraction(BuildInteractionRequest interactionRequest) {
        var oldInteraction = interactionRepository.findByInputs(
                interactionRequest.getUserId(), interactionRequest.getPostId()).orElse(null);
        if(oldInteraction == null) return false;
        var newInteraction = reify(interactionRequest, oldInteraction);
        return newInteraction.isLiked() == interactionRequest.isLiked()
                && newInteraction.isBookmarked() == interactionRequest.isBookmarked();
    }
}
