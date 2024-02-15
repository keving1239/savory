import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/user-slice";
import recipesReducer from './Recipes/recipes-slice';
import interactionsReducer from "./Interactions/interactions-slice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipesReducer,
    interactions: interactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;