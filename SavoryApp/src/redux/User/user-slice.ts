import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
    id: number,
    username: string,
    email: string,
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
}

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
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
        builder.addCase(
            updateUser.fulfilled, (state: UserState, action: PayloadAction<User>) => {
                state.user = action.payload;
            }
        ).addCase(
            updateUser.rejected, (state: UserState, action) => {
                state.error = action.error.message;
                console.error('Error Updating User: ',state.error);
            }
        );
        builder.addCase(
            deleteUser.fulfilled, (state: UserState, action) => {
                state.user = null;
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
    'GET-USER',
    async ({ email, isAuthenticated, token }: { email: string; isAuthenticated: boolean, token: string }) => {
        if(!isAuthenticated || !email || !token) throw new Error('Auth0 Login Failed...');

        const search = await fetch(`http://localhost:8080/api/person/emailExists/${email}`);
        const exists = await search.json();
        const response = exists ? await fetch(`http://localhost:8080/api/person/byEmail/${email}`)
            : await fetch('http://localhost:8080/api/person/new', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: '', email: email, img: '', bio: ''}), 
            });
        const data = await response.json();
        return {user: {id: data.id, username: data.username, email: email,
        img: '', bio: data.bio, role: data.admin} as User, token};
    },
);
export const updateUser = createAsyncThunk(
    'UPDATE-USER',
    async ({id, username, email, img, bio}: {id: number, username: string, email: string, img: string, bio: string}) => {
        const response = await fetch(`http://localhost:8080/api/person/${id}/edit`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, email: email, img: img, bio: bio}), 
        });
        const data = await response.json();
        return {id: data.id, username: data.username, email: email, 
            img: '', bio: data.bio, role: data.admin} as User;
    }
)
export const deleteUser = createAsyncThunk(
    'DELETE-USER',
    async ({id}: {id: number}) => {
        await fetch(`http://localhost:8080/api/person/delete/${id}`, {
            method: 'DELETE'
        });
    }
)

export const { removeLocalUser } = userSlice.actions;
export default userSlice.reducer;