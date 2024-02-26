import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOptions } from "../store";
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from "../store";
import { fetchUser } from "../User/user-slice";

export const selectRecipes = (state: RootState) => state.persistedReducer.recipesReducer;
 
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
export interface LocalRecipesState {
    recipes: Record<number, Recipe>,
    loading: boolean,
    error?: string,
    page: number,
    pageLoaded: boolean
}
 
const initialState: LocalRecipesState = {
    recipes: {},
    loading: false,
    page: 1,
    pageLoaded: false
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
        changePage(state: LocalRecipesState, action: PayloadAction<{pageNumber: number}>) {
            state.page = action.payload.pageNumber;
        },
        updateRecipes(state: LocalRecipesState, action: PayloadAction<{recipe: Recipe}>) {
            const update = action.payload.recipe;
           // const index = state.recipes.findIndex(recipe => recipe.id === update.id);
            if (String(update.id) in state.recipes) {
                state.recipes[update.id] = update;
            };
        },
        loadPage(state: LocalRecipesState, action: PayloadAction<{loaded: boolean}>) {
            state.pageLoaded = action.payload.loaded;
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

        builder
        .addCase(
            fetchBookmarks.pending, (state: LocalRecipesState) => {
                state.loading = true;
                console.log('Bookmark Fetch Started...');
            }
        ).addCase(
            fetchBookmarks.fulfilled, (state: LocalRecipesState, action: PayloadAction<Record<string, Recipe>>) => {
                state.recipes = action.payload;
                state.loading = false;
                console.log('Bookmark Fetch Successful...');
                console.log(state.recipes);
            }
        ).addCase(
            fetchBookmarks.rejected, (state: LocalRecipesState, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('Bookmark Fetch Failed...');
                console.log("error: " + state.error + "here")
            }
        );

        builder
        .addCase(
            fetchUserPosts.pending, (state: LocalRecipesState) => {
                state.loading = true;
                console.log('My Posts Fetch Started...');
            }
        ).addCase(
            fetchUserPosts.fulfilled, (state: LocalRecipesState, action: PayloadAction<Record<string, Recipe>>) => {
                state.recipes = action.payload;
                state.loading = false;
                console.log('My Posts Fetch Successful...');
                console.log(state.recipes);
            }
        ).addCase(
            fetchUserPosts.rejected, (state: LocalRecipesState, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('My Posts Fetch Failed...');
                console.log("error: " + state.error + "here")
            }
        );
    },
});



export const fetchRecipes = createAsyncThunk(
    '/api/recipes/fetch',
    async ({ userId, pageNumber, pageSize = 12}: {userId: number; pageNumber: number; pageSize?: number}) => {
        const response = await fetch(`http://localhost:8080/api/posts/allWithUsername?pageNumber=${pageNumber}&pageSize=${pageSize}`, fetchOptions({
            method: 'GET',
        }));
        console.log("PAGE: " + pageNumber)
         const data = await response.json();
         console.log(data)
         const recipes: Record<number, Recipe> = {};
         data.forEach((item: any) => {
            recipes[item.postId] = {
                tags: item?.tags?.split(' ') || [],
                id: item.postId,
                ownerId: item.userID,
                title: item.headline,
                img: item.img,                 
                date: item.postdate,
                ingredients: item?.ingredients?.split(' ') || [],
                recipe: item.recipe,
                author: item.username,
            }
         });
        return recipes;
    },
);

export const fetchBookmarks = createAsyncThunk(
    '/api/recipes/bookmarks',
    async ({ userId }: {userId: number;}) => {
        const response = await fetch(`http://localhost:8080/api/posts/bookmarkedPosts/${userId}`, fetchOptions({
            method: 'GET',
        }));
         const data = await response.json();
         console.log(data)
         const recipes: Record<number, Recipe> = {};
         data.forEach((item: any) => {
            recipes[item.postId] = {
                tags: item?.tags?.split(' ') || [],
                id: item.postId,
                ownerId: item.userID,
                title: item.headline,
                img: item.img,                 
                date: item.postdate,
                ingredients: item?.ingredients?.split(' ') || [],
                recipe: item.recipe,
                author: item.username,
            }
         });
        return recipes;
    },
);

export const fetchUserPosts = createAsyncThunk(
    '/api/recipes/myPosts',
    async ({ userId, username }: {userId: number; username: string | undefined;}) => {
        const response = await fetch(`http://localhost:8080/api/posts/byUserId/${userId}`, fetchOptions({
            method: 'GET',
        }));
         const data = await response.json();
         console.log(data)
         const recipes: Record<number, Recipe> = {};
         data.forEach((item: any) => {
            recipes[item.postId] = {
                tags: item?.tags?.split(' ') || [],
                id: item.postId,
                ownerId: item.userID,
                title: item.headline,
                img: item.img,                 
                date: item.postdate,
                ingredients: item?.ingredients?.split(' ') || [],
                recipe: item.recipe,
                author: username || '',
            }
         });
        return recipes;
    },
);
 
export const { addRecipes, updateRecipes, deleteRecipes, removeLocalRecipes, changePage, loadPage } = recipesSlice.actions;
export default recipesSlice.reducer;