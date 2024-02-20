import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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
        removeLocalInteractions(state: InteractionsState) {
            state.interactions = {};
        },
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
         const response = await fetch(`http://localhost:8080/api/bookmarks/users/${userId}`);
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

export const postBookmark = createAsyncThunk(
    'api/interactions/postBookmark',
    async ({ postId, userId }: { postId: number; userId: number | undefined }) => {
        const response = await fetch(`http://localhost:8080/api/bookmarks/postBookmark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId, userId }),
        });
        if (!response.ok) {
            throw new Error('Failed to post bookmark');
        } else {
            console.log("POSTED TO DB")
        }
    }
);

export const deleteBookmark = createAsyncThunk(
    'api/interactions/deleteBookmark',
    async ({ postId, userId }: { postId: number; userId: number | undefined }) => {
        const response = await fetch(`http://localhost:8080/api/bookmarks/deleteByInputs/${userId}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete bookmark');
        } else {
            console.log("DELETED FROM DB")
        }
    }
);

export const { toggleLike, toggleBookmark, addInteraction, removeLocalInteractions } = interactionsSlice.actions;
export default interactionsSlice.reducer;