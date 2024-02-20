import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface RecipeInteraction {
    postId: number,
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
        addInteraction(state: InteractionsState, action: PayloadAction<number>) {
            state.interactions[action.payload] = {
                postId: action.payload,
                liked: false,
                bookmarked: false
            }
        }

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
                console.log('Interaction Fetch Failed...');
            }
        );
    }
});

export const fetchInteractions = createAsyncThunk(
    '/api/interactions/fetch',
    async ({userId}: {userId: number}) => {
         const response = await fetch(`http://localhost:8080/api/bookmarks/users/8`);
         const data = await response.json();
         console.log("DATA: " + JSON.stringify(data));
        const interactions: Record<number, RecipeInteraction> = {};
         data.forEach((item: any) => {
             interactions[item.postId] = {
                 postId: item.postId,
                 liked: false,
                 bookmarked: true,
             };
         });
       // interactions[0] = {recipeId: 1, liked: false, bookmarked: false,};
      //  interactions[1] = {recipeId: 1, liked: true, bookmarked: true,};
      //  interactions[2] = {recipeId: 1, liked: true, bookmarked: false,};
        return interactions;
    },
);

export const { toggleLike, toggleBookmark, addInteraction } = interactionsSlice.actions;
export default interactionsSlice.reducer;