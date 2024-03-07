import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOptions } from "../store";

interface User {
    id: number,
    username: string,
    email: string,
    img: string,
    bio: string,
}
export interface UserState {
    isAuthenticated: boolean,
    isAdmin: boolean,
    user: User | null,
    error?: string,
}

const initialState: UserState = {
    isAuthenticated: false,
    isAdmin: false,
    user: null,
};

const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        clearUser(state: UserState) {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
.addCase(
            fetchUser.fulfilled, (state: UserState, action: PayloadAction<{user: User, isAdmin: boolean}>) => {
                state.user = action.payload.user;
                state.isAdmin = action.payload.isAdmin;
                state.isAuthenticated = true;
            }
        ).addCase(
            fetchUser.rejected, (state: UserState, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isAdmin = false;
                state.error = action.error.message
                console.error('Error Fetching User', state.error);
            }
        );
        builder.addCase(
            updateUser.fulfilled, (state: UserState, action: PayloadAction<User>) => {
                state.user = action.payload;
            }
        ).addCase(
            updateUser.rejected, (state, action) => {
                state.error = action.error.message
                console.error('Error Updating User', state.error);
            }
        );
        builder.addCase(
            deleteUser.fulfilled, (state: UserState) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isAdmin = false;
            } 
        ).addCase(
            deleteUser.rejected, (state: UserState, action) => {
                state.error = action.error.message;
                console.error('Error Deleting User: ', state.error);
            }
        );
    },
});

export const fetchUser = createAsyncThunk(
    'FETCH-USER',
    async ({ email, isAuthenticated, isAdmin }: 
        { email: string; isAuthenticated: boolean, isAdmin: boolean }) => {
        if(!isAuthenticated || !email) throw new Error('Auth0 Login Failed...');
        const search = await fetch(`https://savory-backend.azurewebsites.net/api/person/emailExists/${email}`, fetchOptions({
            method: 'GET',
        }));
        const exists = await search.json();
        const response = exists ? await fetch(`https://savory-backend.azurewebsites.net/api/person/byEmail/${email}`, fetchOptions({
                method: 'GET',    
            }))
            : await fetch('https://savory-backend.azurewebsites.net/api/person/new', fetchOptions({
                method: 'POST', body: JSON.stringify({username: '', email: email, img: '', bio: ''}),
            }));
        const data = await response.json();
        return {user: {id: data.id, username: data.username, email: data.email,
        img: data.img, bio: data.bio} as User, isAdmin};
    },
);
export const updateUser = createAsyncThunk(
    'UPDATE-USER',
    async ({id, username, email, img, bio}: {id: number, username: string, email: string, img: string, bio: string}) => {
        const response = await fetch(`https://savory-backend.azurewebsites.net/api/person/edit/${id}`, fetchOptions({
            method: 'PUT', body: JSON.stringify({username: username, email: email, img: img, bio: bio}),
        }));
        const data = await response.json();
        return {id: data.id, username: data.username, email: data.email, 
            img: data.img, bio: data.bio} as User;
    }
);
export const deleteUser = createAsyncThunk(
    'DELETE-USER',
    async ({id}: {id: number}) => {
        await fetch(`https://savory-backend.azurewebsites.net/api/person/delete/${id}`, fetchOptions({
            method: 'DELETE',
        }));
    }
);

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;