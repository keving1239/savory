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
        toggleLike(state: InteractionsState, action: PayloadAction<{recipeId: number; liked: boolean}>) {
            state.interactions[action.payload.recipeId].liked = action.payload.liked;
        },
        toggleBookmark(state: InteractionsState, action: PayloadAction<{recipeId: number; bookmarked: boolean}>) {
            state.interactions[action.payload.recipeId].bookmarked = action.payload.bookmarked;
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
            }
        ).addCase(
            fetchInteractions.rejected, (state: InteractionsState, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('Interaction Fetch Failed...');
            }
        );
    }
});

export const fetchInteractions = createAsyncThunk(
    '/api/interactions/fetch',
    async () => {
        const response = await fetch(`http://localhost:8080/posts`);
        const data = await response.json();
        const interactions: Record<number, RecipeInteraction> = {};
        data.forEach((item: any) => {
            interactions[item.post_id] = {
                recipeId: item.post_id,
                liked: false,
                bookmarked: false,
            };
        });
        return interactions;
    },
);

export const { toggleLike, toggleBookmark } = interactionsSlice.actions;
export default interactionsSlice.reducer;