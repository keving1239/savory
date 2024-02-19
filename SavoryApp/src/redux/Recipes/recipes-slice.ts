import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Recipe {
    tags: string[];
    id: any,
    ownerId: number,
    title: string;
    img: string;
    isBookmarked: boolean,
    isLiked: boolean,
    date: Date,
    tage: string,
    ingredients: string[],
    recipe: string,
    author: string
}
interface LocalRecipesState {
    recipes: Recipe[],
    loading: boolean,
    error?: string,
}

const initialState: LocalRecipesState = {
    recipes: [],
    loading: false,
};

const recipesSlice = createSlice({
    name: 'recipes-slice',
    initialState,
    reducers: {
        addRecipes(state: LocalRecipesState, action: PayloadAction<{recipe: Recipe}>) {
            state.recipes.push(action.payload.recipe);
        },
        updateRecipes(state: LocalRecipesState, action: PayloadAction<{recipe: Recipe}>) {
            const update = action.payload.recipe;
            const index = state.recipes.findIndex(recipe => recipe.id === update.id);
            if (index !== -1) state.recipes[index] = update;
        },
        deleteRecipes(state: LocalRecipesState, action: PayloadAction<{recipeId: number}>) {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload.recipeId);
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
            fetchRecipes.fulfilled, (state: LocalRecipesState, action: PayloadAction<Recipe[]>) => {
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

function splitter(input:string) {

    return input.split(", ")

}

export const fetchRecipes = createAsyncThunk(
    '/api/recipes/fetch',
    async ({userId}: {userId: number}) => {
         const response = await fetch('http://localhost:8080/posts/allWithUsername');
         const data = await response.json();
         const recipes: Recipe[] = data.map((item: any) => ({
             id: String(item.post_id),
             author: item.username,
             ownerId: item.userID,
             title: item.headline,
             img: 'https://images.unsplash.com/photo-1680990999782-ba7fe26e4d0b?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
             recipe: item.recipe,
             tags: splitter(item.tags),
             ingredients: splitter(item.ingredients),
             isBookmarked: false,
             isLiked: true,
             date: item.postdate
         }));
  //      const recipes: Recipe[] = [
    //        {id: 1, ownerId: userId, title: 'Recipe 1', img: 'img',},
     //       {id: 2, ownerId: userId, title: 'Recipe 2', img: 'img',},
     //       {id: 3, ownerId: userId, title: 'Recipe 3', img: 'img',},
      //  ];
        return recipes;
    },
);

export const { addRecipes, updateRecipes, deleteRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;