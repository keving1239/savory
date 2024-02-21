import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface RecipeInteraction {
    recipeId: number,
    liked: boolean,
    bookmarked: boolean,
}
interface InteractionsState {
    interactions: Record<number, RecipeInteraction>,
    loading: boolean,
    error?: string,
}


const initialState: InteractionsState = {
    interactions: {},
    loading: false,
};


const interactionsSlice = createSlice({
    
    name: 'interactions-slice',
    initialState,
    
    reducers: {
        removeLocalInteractions(state: InteractionsState) {
            state.interactions = {};
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            fetchInteractions.pending, (state: InteractionsState) => {
                state.loading = true;
                console.log('Interaction Fetch Started...');
            }
        ).addCase(
            fetchInteractions.fulfilled, (state: InteractionsState, action: PayloadAction<Record<number, RecipeInteraction>>) => {
                state.interactions = action.payload;
                state.loading = false;
                console.log('Interaction Fetch Successful...');
                console.log(state.interactions);
            }
        ).addCase(
            fetchInteractions.rejected, (state: InteractionsState, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('Interaction Fetch Failed... ');
                console.error(state.error);
            }
        );
        builder.addCase(
            postInteraction.fulfilled, (state: InteractionsState, action: PayloadAction<RecipeInteraction>) => {
                state.interactions[action.payload.recipeId] = action.payload;
            }
        ).addCase(
            postInteraction.rejected, (state: InteractionsState, action) => {
                state.error = action.error.message;
                console.error('Error Posting Interaction: ',state.error);
            }
        );
        builder.addCase(
            deleteInteraction.fulfilled, (state: InteractionsState, action: PayloadAction<number>) => {
                delete state.interactions[action.payload];
            }
        ).addCase(
            deleteInteraction.rejected, (state: InteractionsState, action) => {
                state.error = action.error.message;
                console.error('Error Deleting Interaction: ',state.error);
            }
        );
        builder.addCase(
            updateInteraction.fulfilled, (state: InteractionsState, action: PayloadAction<RecipeInteraction>) => {
                state.interactions[action.payload.recipeId] = action.payload;
            }
        ).addCase(
            updateInteraction.rejected, (state: InteractionsState, action) => {
                state.error = action.error.message;
                console.error('Error Updating Interaction: ',state.error);
            }
        );
    }
});

export const fetchInteractions = createAsyncThunk(
    'fetch-interactions',
    async ({userId}: {userId: number}) => {
        const response = await fetch(`http://localhost:8080/api/interaction/users/${userId}`);
        const data = await response.json();
        const interactions: Record<number, RecipeInteraction> = {};
        data.forEach((item: any) => {
            interactions[item.postId] = {
                recipeId: item.postId,
                liked: item.liked,
                bookmarked: item.bookmarked,
            };
        });
        return interactions;
    },
);

export const postInteraction = createAsyncThunk(
    'post-interaction',
    async ({ postId, userId, liked, bookmarked }: 
        { postId: number; userId: number, liked: boolean, bookmarked: boolean }) => {
        await fetch('http://localhost:8080/api/interaction/postInteraction', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({postId: postId, userId: userId, isBookmarked: bookmarked, isLiked: liked}),
        });
        return {recipeId: postId, bookmarked, liked} as RecipeInteraction;
    }
);

export const updateInteraction = createAsyncThunk(
    'update-interaction',
    async ({ postId, userId, liked, bookmarked }: 
        { postId: number; userId: number, liked: boolean, bookmarked: boolean }) => {
        await fetch('http://localhost:8080/api/interaction/update', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({postId: postId, userId: userId, isBookmarked: bookmarked, isLiked: liked}),
        });
        return {recipeId: postId, bookmarked, liked} as RecipeInteraction;
    }
);

export const deleteInteraction = createAsyncThunk(
    'delete-interaction',
    async ({ postId, userId }: { postId: number; userId: number | undefined }) => {
        await fetch(`http://localhost:8080/api/interaction/deleteByInputs/${userId}/${postId}`,
        {method: 'DELETE'});
        return postId;
    }
);

export const { removeLocalInteractions } = interactionsSlice.actions;
export default interactionsSlice.reducer;