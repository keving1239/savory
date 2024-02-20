import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
    id: number,
    username: string,
    img: string,
    bio: string,
    role: boolean,
}
interface UserState {
    isAuthenticated: boolean,
    user: User | null,
    token: string | null,
    loading: boolean,
    error?: string,
}

const initialState: UserState = {
    isAuthenticated: true,
    user: null,
    token: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        removeUser(state: UserState) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            console.log(`User Removed...`);
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
        );
    },
});

export const fetchUser = createAsyncThunk(
    '/api/person/email/{email}',
    async ({ email, isAuthenticated, token }: { email: string; isAuthenticated: boolean, token: string }) => {
        if(!isAuthenticated || !email || !token) throw new Error('Auth0 Login Failed...');
        // const response = await fetch(`http://localhost:8080/api/person/email/${email}`);
        // const data = await response.json();
        // return {user: {id: data.id, username: data.username, 
        // img: '', bio: data.bio, role: data.admin} as User, token};
        return {user: {id: 8, username: 'our.database.be.broken', 
            img: '', bio: 'spongeboy me bob', role: false} as User, token};
    },
);

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;