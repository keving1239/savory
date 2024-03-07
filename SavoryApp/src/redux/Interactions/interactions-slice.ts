import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOptions } from "../store";


export interface RecipeInteraction {
    recipeId: number,
    liked: boolean,
    shared: boolean,
    bookmarked: boolean,
}
export interface InteractionsState {
    interactions: Record<number, RecipeInteraction>,
    error?: string,
}


const initialState: InteractionsState = {
    interactions: {},
};

const interactionsSlice = createSlice({
    
    name: 'interactions-slice',
    initialState,
    
    reducers: {
        clearInteractions(state: InteractionsState) {
            state.interactions = {};
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            fetchInteractions.fulfilled, (state: InteractionsState, action: PayloadAction<Record<number, RecipeInteraction>>) => {
                state.interactions = action.payload;
            }
        ).addCase(
            fetchInteractions.rejected, (state: InteractionsState, action) => {
                state.error = action.error.message;
                console.error('Error Fetching Interactions', state.error);
            }
        );
        builder.addCase(
            postInteraction.fulfilled, (state: InteractionsState, action: PayloadAction<RecipeInteraction>) => {
                state.interactions[action.payload.recipeId] = action.payload;
            }
        ).addCase(
            postInteraction.rejected, (state: InteractionsState, action) => {
                state.error = action.error.message;
                console.error('Error Posting Interaction: ', state.error);
            }
        );
        builder.addCase(
            deleteInteraction.fulfilled, (state: InteractionsState, action: PayloadAction<number>) => {
                if(action.payload in state.interactions) delete state.interactions[action.payload];
            }
        ).addCase(
            deleteInteraction.rejected, (state: InteractionsState, action) => {
                state.error = action.error.message;
                console.error('Error Deleting Interaction: ', state.error);
            }
        );
        builder.addCase(
            updateInteraction.fulfilled, (state: InteractionsState, action: PayloadAction<RecipeInteraction>) => {
                state.interactions[action.payload.recipeId] = action.payload;
            }
        ).addCase(
            updateInteraction.rejected, (state: InteractionsState, action) => {
                state.error = action.error.message;
                console.error('Error Updating Interaction: ', state.error);
            }
        );
    }
});

export const fetchInteractions = createAsyncThunk(
    'fetch-interactions',
    async ({userId}: {userId: number}) => {
        const response = await fetch(`${process.env.REACT_APP_URL_KEY}/api/interaction/users/${userId}`, fetchOptions({
            method: 'GET'
        }));
        const data = await response.json();
        const interactions: Record<number, RecipeInteraction> = {};
        data.forEach((item: any) => {
            interactions[item.postId] = {
                recipeId: item.postId,
                liked: item.liked,
                shared: item.shared,
                bookmarked: item.bookmarked,
            };
        });
        return interactions;
    },
);

export const postInteraction = createAsyncThunk(
    'post-interaction',
    async ({ postId, userId, liked, shared, bookmarked }: 
        { postId: number; userId: number, liked: boolean, shared:boolean, bookmarked: boolean }) => {
        await fetch('${process.env.REACT_APP_URL_KEY}/api/interaction/postInteraction', fetchOptions({
            method: 'POST', body: JSON.stringify({postId: postId, userId: userId, isBookmarked: bookmarked, isLiked: liked, isShared: shared }),
        }));
        return {recipeId: postId, bookmarked, liked, shared} as RecipeInteraction;
    }
);

export const updateInteraction = createAsyncThunk(
    'update-interaction',
    async ({ postId, userId, liked, bookmarked, shared }: 
        { postId: number; userId: number, liked: boolean, shared:boolean, bookmarked: boolean }) => {
        await fetch('${process.env.REACT_APP_URL_KEY}/api/interaction/update', fetchOptions({
            method: 'PUT', body: JSON.stringify({postId: postId, userId: userId, isBookmarked: bookmarked, isLiked: liked, isShared: shared }),
        }));
        return {recipeId: postId, bookmarked, liked, shared} as RecipeInteraction;
    }
);

export const deleteInteraction = createAsyncThunk(
    'delete-interaction',
    async ({ postId, userId }: { postId: number; userId: number | undefined }) => {
        await fetch(`${process.env.REACT_APP_URL_KEY}/api/interaction/deleteByInputs/${userId}/${postId}`, fetchOptions({
            method: 'DELETE'
        }));
        return postId;
    }
);

export const { clearInteractions } = interactionsSlice.actions;
export default interactionsSlice.reducer;