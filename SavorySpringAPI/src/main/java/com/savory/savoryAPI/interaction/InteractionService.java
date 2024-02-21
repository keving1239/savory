package com.savory.savoryAPI.interaction;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import com.savory.savoryAPI.interaction.dto.InteractionDto;
import com.savory.savoryAPI.interaction.dto.BuildInteractionRequest;
import com.savory.savoryAPI.interaction.entity.Interaction;
import com.savory.savoryAPI.interaction.util.InteractionUtil;
import org.springframework.stereotype.Service;

@Service
public class InteractionService {
    private final InteractionRepository interactionRepository;

    @Autowired
    public InteractionService(InteractionRepository interactionRepository) {
        this.interactionRepository = interactionRepository;
    }

    public InteractionDto createInteraction(BuildInteractionRequest interactionDto) {
        var interaction = reify(interactionDto, new Interaction());
        var savedInteraction = interactionRepository.save(interaction);

        return InteractionUtil.buildInteractionDto(savedInteraction);
    }

    private Interaction reify(BuildInteractionRequest interactionDto, Interaction target) {
        target.setPostId(interactionDto.getPostId());
        target.setUserId(interactionDto.getUserId());
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
}
