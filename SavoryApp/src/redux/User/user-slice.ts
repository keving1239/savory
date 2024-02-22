import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
    id: number,
    username: string,
    img: string,
    bio: string,
    role: boolean,
}
export interface UserState {
    isAuthenticated: boolean,
    user: User | null,
    token: string | null,
    loading: boolean,
    error?: string,
    localUser: User | null
}

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    localUser: null
};

const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        removeLocalUser(state: UserState) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        updateUserUsername(state: UserState, action: PayloadAction<{username: string}>) {
            if(!state.user) return;
            state.user.username = action.payload.username;
        },
        updateUserImage(state: UserState, action: PayloadAction<{img: string}>) {
            if(!state.user) return;
            state.user.img = action.payload.img;
        },
        updateUserBio(state: UserState, action: PayloadAction<{bio: string}>) {
            if(!state.user) return;
            state.user.bio = action.payload.bio;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            fetchUser.pending, (state: UserState) => {
                state.loading = true;
                console.log('User Fetch Started...');
            }    
        ).addCase(
            fetchUser.fulfilled, (state: UserState, action: PayloadAction<{user: User, token: string}>) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.loading = false;
                console.log('User Fetch Successful...');
                console.log(state.user);
            }
        ).addCase(
            fetchUser.rejected, (state: UserState, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.token = null;
                state.loading = false;
                state.error = action.error.message;
                console.log('User Fetch Failed...');
                console.error(state.error);
            }
        ).addCase(
            fetchLocalUser.pending, (state: UserState) => {
                state.loading = true;
                console.log('Fetching Local User...')
            }
        ).addCase(
            fetchLocalUser.rejected, (state: UserState, action) => {
                console.log('Local User Fetch Failed...');
                console.error(state.error)
            }
        ).addCase(
            fetchLocalUser.fulfilled, (state: UserState, action: PayloadAction<{user: User}>) => {
            state.localUser = action.payload.user;
            console.log('Local User Fetch Successful...');
            console.log(JSON.stringify(state.localUser));
            }
        )
    },
});

export const fetchUser = createAsyncThunk(
    '/api/person/email/{email}',
    async ({ email, isAuthenticated, token }: { email: string; isAuthenticated: boolean, token: string }) => {
        if(!isAuthenticated || !email || !token) throw new Error('Auth0 Login Failed...');
        const response = await fetch(`http://localhost:8080/api/person/byEmail/${email}`);
        const data = await response.json();
        return {user: {id: data.id, username: data.username, 
        img: '', bio: data.bio, localUser: null, role: data.admin} as User, token};
    },
);
export const updateUser = createAsyncThunk(
    '/api/person/update',
    async ({id, username, email, img, bio}: {id: number, username: string, email: string, img: string, bio: string}) => {
        const response = await fetch(`http://localhost:8080/api/person/${id}/edit`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, email: email, img: img, bio: bio, isAdmin: false}), 
        });
    }
);

export const fetchLocalUser = createAsyncThunk(
    '/api/person/username/{username}',
    async ({ username }: { username: string;}) => {
        if(!username) throw new Error('Auth0 Login Failed...');
        const response = await fetch(`http://localhost:8080/api/person/byUsername/${username}`);
        const data = await response.json();
        return {user: {id: data.id, username: data.username, 
        img: '', bio: data.bio, role: data.admin} as User};
        // return {user: {id: 12345, username: '', 
            // img: '', bio: 'spongeboy me bob', role: false} as User, token};
    },
);

export const { removeLocalUser, updateUserUsername, updateUserImage, updateUserBio } = userSlice.actions;
export default userSlice.reducer;