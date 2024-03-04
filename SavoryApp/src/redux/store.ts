import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sessionStorage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from "./User/user-slice";
import recipesReducer from './Recipes/recipes-slice';
import interactionsReducer from "./Interactions/interactions-slice";
import themeReducer from './Theme/theme-slice'

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['userReducer', 'recipesReducer', 'interactionsReducer', 'themeReducer'],  
}
const middleware = getDefaultMiddleware({serializableCheck: false,});
const rootReducer = combineReducers({
  userReducer,
  recipesReducer,
  interactionsReducer,
  themeReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const fetchOptions = ({method, body}: {method: string, body?: string}) => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(cookie => cookie.startsWith('jwtToken='));
  const token = tokenCookie ? tokenCookie.split('=')[1] : null;
  const headers: Record<string, string> = {};
  if(body) headers['Content-Type'] = 'application/json';
  headers['Authorization'] = `Bearer ${token}`;
  return body ? {
    method: method,
    headers: headers,
    body: body,
  } : {
    method: method,
    headers: headers,
  };
}

export const store = configureStore({reducer: {persistedReducer}, middleware});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;