import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOptions } from "../store";
import { RootState } from "../store";

export const selectRecipes = (state: RootState) => state.persistedReducer.recipesReducer;
 
export interface Recipe {
    id: number,
    userId: number,
    title: string,
    img: string,
    date: string,
    author: string,
    recipe: string,
    ingredients: string[],
    tags: string[],
}
export interface LocalRecipesState {
    recipes: Record<number, Recipe>,
    page: number;
    error?: string,
}
 
const initialState: LocalRecipesState = {
    recipes: {},
    page: 1,
};
 
const recipesSlice = createSlice({
    name: 'recipes-slice',
    initialState,
    reducers: {
        clearRecipes(state: LocalRecipesState) {
            state.recipes = {};
            state.page = 1;
        },
        changePage(state: LocalRecipesState, action: PayloadAction<number>) {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            fetchRecipes.fulfilled, (state: LocalRecipesState, action: PayloadAction<Record<string, Recipe>>) => {
                state.recipes = action.payload;
            }
        ).addCase(
            fetchRecipes.rejected, (state: LocalRecipesState, action) => {
                state.error = action.error.message;
                console.error('Error Fetching Interactions: ',state.error);
            }
        );
        builder
        .addCase(
            createRecipe.fulfilled, (state: LocalRecipesState, action: PayloadAction<Recipe>) => {
                state.recipes[action.payload.id] = action.payload;
            }
        ).addCase(
            createRecipe.rejected, (state: LocalRecipesState, action) => {
                state.error = action.error.message;
                console.error('Error Creating Recipe: ',state.error);
            }
        );
        builder
        .addCase(
            updateRecipe.fulfilled, (state: LocalRecipesState, action: PayloadAction<Recipe>) => {
                state.recipes[action.payload.id] = action.payload;
            }
        ).addCase(
            updateRecipe.rejected, (state: LocalRecipesState, action) => {
                state.error = action.error.message;
                console.error('Error Updating Recipe: ',state.error);
            }
        );
        builder
        .addCase(
            deleteRecipe.fulfilled, (state: LocalRecipesState, action: PayloadAction<number>) => {
                if (action.payload in state.recipes) delete state.recipes[action.payload];
            }
        ).addCase(
            deleteRecipe.rejected, (state: LocalRecipesState, action) => {
                state.error = action.error.message;
                console.error('Error Deleting Recipe: ', state.error);
            }
        );
    },
});



export const fetchRecipes = createAsyncThunk(
    'FETCH-RECIPES',
    async ({ userId, pageNumber }: {userId?: number; pageNumber: number}) => {
        // for now fetch all in paginated style
        const response = await fetch(`http://localhost:8080/api/posts/allWithUsername?pageNumber=${pageNumber}`, fetchOptions({
            method: 'GET',
        }));
         const data = await response.json();
         const recipes: Record<number, Recipe> = {};
         data.forEach((item: any) => {
            recipes[item.postId] = {
                tags: item.tags?.split(',') || [],
                id: item.postId,
                userId: item.userId,
                title: item.headline,
                img: item.img,                 
                date: item.postdate?.substring(0, 10),
                ingredients: item.ingredients?.split(',') || [],
                recipe: item.recipe,
                author: item.username,
            }
         });
        return recipes;
    },
);
export const createRecipe = createAsyncThunk(
    'CREATE-RECIPE',
    async ({userId, headline, ingredients, recipe, img, tags}: 
        {userId: number, headline: string, ingredients: string, recipe: string, img: string, tags: string}) => {
        const response = await fetch('http://localhost:8080/api/posts/new', fetchOptions({
            method: 'POST', 
            body: JSON.stringify({userId: userId, headline: headline, ingredients: ingredients, recipe: recipe, img: img, tags: tags}),
        }));
        const data = await response.json();
        return {id:data.postId, userId:data.userId, title:data.headline, img:data.img, 
            date:data.postDate, ingredients:data.ingredients.split(','), 
            tags: data.tags.split(',') || [], recipe:data.recipe, author:data.username} as Recipe;
    }
);
export const updateRecipe = createAsyncThunk(
    'UPDATE-RECIPE',
    async ({postId, userId, headline, ingredients, recipe, img, tags}: 
        {postId: number, userId: number, headline: string, ingredients: string, recipe: string, img: string, tags: string}) => {
        const response = await fetch(`http://localhost:8080/api/posts/edit/${postId}`, fetchOptions({
            method: 'PUT',
            body: JSON.stringify({userId: userId, headline: headline, ingredients: ingredients, recipe: recipe, img: img, tags: tags}),
        }));
        const data = await response.json();
        return {tags:data.tags, id:data.postId, userId:data.userId, title:data.headline, img:data.img, 
            date:data.postDate, ingredients:data.ingredients, recipe:data.recipe, author:data.username} as Recipe;
    }
);
export const deleteRecipe = createAsyncThunk(
    'DELETE-RECIPE',
    async ({postId}: {postId: number}) => {
        const response = await fetch(`http://localhost:8080/api/posts/delete/${postId}`, fetchOptions({
            method: 'DELETE',
        }));
        if(!response.ok) throw new Error(`Unable to delete post ${postId}`); 
        return postId;
    }
);

export const { clearRecipes, changePage } = recipesSlice.actions;
export default recipesSlice.reducer;