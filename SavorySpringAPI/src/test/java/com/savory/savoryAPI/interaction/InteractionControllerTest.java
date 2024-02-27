package com.savory.savoryAPI.interaction;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import com.savory.savoryAPI.interaction.dto.InteractionDto;

@ExtendWith(SpringExtension.class)
class InteractionControllerTest {
    
    private InteractionController interactionController;
    private InteractionService interactionService;

    @BeforeEach
    public void setup() {
        interactionService = mock(InteractionService.class);
        interactionController = new InteractionController(interactionService);
    }

    @Test
    void getInteractionIfIDIsInSet() {
        //Arrange
        int interactionUserId = 3;
        InteractionDto interactionDtoOne =  createExpecteInteractionDto(1, 4, interactionUserId);
        InteractionDto interactionDtoTwo =  createExpecteInteractionDto(2, 5, interactionUserId);
        List<InteractionDto> expectedInteraction = Arrays.asList(
            interactionDtoOne, interactionDtoTwo
        );
        //Mock
        when(interactionService.findInteractionsByUserId(eq(interactionUserId))).thenReturn(expectedInteraction);
        //Act
        List<InteractionDto> actualInteraction = interactionController.getInteractionsByUserId(interactionUserId);
        //Assert
        assertEquals(expectedInteraction, actualInteraction);
        //Verify
        verify(interactionService, times(1)).findInteractionsByUserId(interactionUserId);
    }

    @Test
    void getBookmarkTotalBookmarkCount() {
        InteractionDto interactionDtoOne =  createExpecteInteractionDto(1, 4, 2);
        InteractionDto interactionDtoTwo = createExpecteInteractionDto(2, 6, 3);
        InteractionDto interactionDtoThree = createExpecteInteractionDto(3, 1, 1);
        List<InteractionDto> expectedInteraction = Arrays.asList(
            interactionDtoOne, interactionDtoTwo, interactionDtoThree
        );
        //Mock
        when(interactionService.findAllInteractions()).thenReturn(expectedInteraction);
        //Act
        List<InteractionDto> actualInteraction = interactionController.getAllInteractions();
        //Assert
        assertEquals(expectedInteraction, actualInteraction);
        //Verify
        verify(interactionService, times(1)).findAllInteractions();

    }

    private InteractionDto createExpecteInteractionDto(int id, int postId, int userId) {
        return InteractionDto.builder()
                .id(id)
                .postId(postId)
                .userId(userId)
                .build();
    }
}
