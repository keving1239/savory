package com.savory.savoryAPI.interaction;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.savory.savoryAPI.interaction.dto.InteractionDto;
import com.savory.savoryAPI.interaction.dto.BuildInteractionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interaction")
@CrossOrigin(origins = "http://localhost:3000")
public class InteractionController {
    private final InteractionService interactionService;

    @Autowired
    public InteractionController(InteractionService interactionService) {
        this.interactionService = interactionService;
    }

    @GetMapping("/all")
    public List<InteractionDto> getAllInteractions() {
        return interactionService.findAllInteractions();
    }

    @GetMapping("/users/{userId}")
    public List<InteractionDto> getInteractionsByUserId(@PathVariable int userId) {
        return interactionService.findInteractionsByUserId(userId);
    }

    @GetMapping("/post/likes/{postId}")
    public Integer getLikeCount(@PathVariable int postId) {
        return interactionService.getLikeCount(postId);
    }
    @GetMapping("/post/bookmarks/{postId}")
    public Integer getBookmarkCount(@PathVariable int postId) {
        return interactionService.getBookmarkCount(postId);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateInteraction(@RequestBody BuildInteractionRequest interactionRequest) {
        return (interactionService.updateInteraction(interactionRequest)) ?
                ResponseEntity.ok("Interaction Updated "+interactionRequest) :
                ResponseEntity.status(HTTPResponse.SC_NOT_FOUND).body("Interaction not found.");
    }

    @PostMapping("/postInteraction")
    public InteractionDto createInteraction(@RequestBody BuildInteractionRequest interactionRequest) {
        return interactionService.createInteraction(interactionRequest);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteInteractionById(@PathVariable int id) {
        interactionService.deleteInteractionById(id);
    }

    @DeleteMapping("/deleteByInputs/{userId}/{postId}")
    public void deleteInteractionByInputs(@PathVariable int userId, @PathVariable int postId) {
        interactionService.deleteInteractionByInputs(userId, postId);
    }

    @DeleteMapping("/deleteByUserId/{userId}")
    public void deleteInteractionByUserId(@PathVariable int userId) {
        interactionService.deleteInteractionById(userId);
    }
}
