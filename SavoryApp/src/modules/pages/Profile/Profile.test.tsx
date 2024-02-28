import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from '../../../redux/store';

const mockUser = {
    id: 1,
    username: 'batman',
    email: 'test@example.com',
    img: 'test.jpg',
    bio: 'Test bio',
    role: false
};

// Create a mock Redux store with the desired initial state
const mockStore = configureStore<RootState>([]);
const initialState: RootState = {
    persistedReducer: {
        userReducer: {
            user: mockUser,
            isAuthenticated: false,
            localUser: mockUser,
            token: null,
            loading: false
        },
        recipesReducer: {
            recipes: {},
            loading: false,
            page: 1,
            pageLoaded: false
        },
        interactionsReducer: {
            interactions: {},
            loading: false,
        },
        _persist: {
            version: -1, 
            rehydrated: true, 
          }
    }
};

const store = mockStore(initialState);


describe('Profile', () => {
    it('loads the correct username', async () => {
        const username = 'batman';
        const route = `/profile/${username}`;

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[route]}>
                    <Routes>
                        <Route path="/profile/:username" element={<Profile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Assert that the correct username is rendered in the component
        const usernameElement = await screen.findByText(`${username}`);
        expect(usernameElement).toBeInTheDocument();
    });
});
