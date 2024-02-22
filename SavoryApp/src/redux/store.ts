import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sessionStorage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from "./User/user-slice";
import recipesReducer from './Recipes/recipes-slice';
import interactionsReducer from "./Interactions/interactions-slice";

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['userReducer', 'recipesReducer', 'interactionsReducer'],  
}
const middleware = getDefaultMiddleware({serializableCheck: false,});
const rootReducer = combineReducers({
  userReducer,
  recipesReducer,
  interactionsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({reducer: {persistedReducer}, middleware});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


