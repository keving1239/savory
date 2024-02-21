import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 
interface Recipe {
    tags: string[];
    id: number,
    ownerId: number,
    title: string;
    img: string;
    date: Date,
    ingredients: string[],
    recipe: string,
    author: string
}
interface LocalRecipesState {
    recipes: Record<number, Recipe>,
    loading: boolean,
    error?: string,
}
 
const initialState: LocalRecipesState = {
    recipes: {},
    loading: false,
};
 
const recipesSlice = createSlice({
    name: 'recipes-slice',
    initialState,
    reducers: {
        removeLocalRecipes(state: LocalRecipesState) {
            state.recipes = {};
        },
        addRecipes(state: LocalRecipesState, action: PayloadAction<{recipe: Recipe}>) {
            state.recipes[action.payload.recipe.id] = action.payload.recipe;
        },
        updateRecipes(state: LocalRecipesState, action: PayloadAction<{recipe: Recipe}>) {
            const update = action.payload.recipe;
           // const index = state.recipes.findIndex(recipe => recipe.id === update.id);
            if (String(update.id) in state.recipes) {
                state.recipes[update.id] = update;
            };
        },
        deleteRecipes(state: LocalRecipesState, action: PayloadAction<{recipeId: number}>) {
            if (String(action.payload.recipeId) in state.recipes) {
                delete state.recipes[action.payload.recipeId]
            }
          //  state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload.recipeId);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            fetchRecipes.pending, (state: LocalRecipesState) => {
                state.loading = true;
                console.log('Recipe Fetch Started...');
            }
        ).addCase(
            fetchRecipes.fulfilled, (state: LocalRecipesState, action: PayloadAction<Record<string, Recipe>>) => {
                state.recipes = action.payload;
                state.loading = false;
                console.log('Recipe Fetch Successful...');
                console.log(state.recipes);
            }
        ).addCase(
            fetchRecipes.rejected, (state: LocalRecipesState, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('Recipe Fetch Failed...');
                console.log("error: " + state.error + "here")
            }
        );
    },
});



export const fetchRecipes = createAsyncThunk(
    '/api/recipes/fetch',
    async ({userId}: {userId: number}) => {
         const response = await fetch('http://localhost:8080/posts/allWithUsername');
         const data = await response.json();
         const recipes: Record<number, Recipe> = {};
         console.log(data);
         data.forEach((item: any) => {
            recipes[item.post_id] = {
                tags: item?.tags?.split(' ') || [],
                id: item.post_id,
                ownerId: item.userID,
                title: item.headline,
                img: 'https://images.unsplash.com/photo-1680990999782-ba7fe26e4d0b?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',                 
                date: item.postdate,
                ingredients: item?.ingredients?.split(' ') || [],
                recipe: item.recipe,
                author: item.username,
            }
         });
        return recipes;
    },
);
 
export const { addRecipes, updateRecipes, deleteRecipes, removeLocalRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;