import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import { authState, renderWithProviders } from '../../../setupTests';

// (global as any).fetch = jest.fn();

describe('Profile', () => {
    beforeEach(() => {
        const username = authState.userReducer?.user?.username || '';
        jest.spyOn(global, 'fetch').mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
            const url = typeof input === 'string' ? input : (input as Request).url;
            if (url === `https://savory-backend.azurewebsites.net/api/person/byUsername/${username}`) {
                return Promise.resolve({
                    json: () => Promise.resolve({
                        id: 205,
                        username: 'savory.taste.tester',
                        img: '',
                        bio: 'Hi, I am a tester for Savory!'
                    })
                } as Response);
            } else if (url === `https://savory-backend.azurewebsites.net/api/posts/byUserId/12?pageNumber=1`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(
                        [{"postId":270,"userId":12,"headline":"Teriyaki Chicken","ingredients":"Chicken thighs or breasts,Soy sauce,Brown sugar,Garlic,Ginger","recipe":"Begin by gathering your ingredients and preparing them as needed. In a suitable cooking vessel, combine the main ingredients together. Season to taste with salt, pepper, and any other desired spices. Heat the mixture over medium heat until it reaches the desired temperature. While it's cooking, make sure to stir occasionally to prevent sticking. Once the mixture is cooked through, remove it from the heat and let it cool slightly. Serve the dish hot or cold, depending on your preference. Optionally, garnish with fresh herbs or a squeeze of citrus for added flavor. Enjoy your creation with friends and family! Don't forget to clean up afterward for a tidy kitchen.","img":"https://images.themodernproper.com/billowy-turkey/production/posts/2022/TeriyakiChicken_4.jpg?w=1200&h=630&q=82&fm=jpg&fit=crop&dm=1687729645&s=7734d7ccfa788022a3d8acd7005770e3","tags":"TeriyakiTemptation,AsianInspiration,SweetAndSavory","postdate":"2024-01-20T18:25:33.347+00:00"}]
                    )
                } as Response);
            } else if (url === `https://savory-backend.azurewebsites.net/api/interaction/profile/interactions/12`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(
                        {}
                    )
                } as Response);
            } else {
                return Promise.reject(new Error('Unknown URL'));
            }
        });
    });

    //integration test
    it('loads the correct username', () => {
        const bio = authState.userReducer?.user?.bio || '';
        const username = authState.userReducer?.user?.username || '';
        renderWithProviders(
            <Routes>
                <Route path={`/profile/username${username}`} element={<Profile />} /> 
            </Routes>,
        {preloadedState: authState});
        waitFor(() => {expect(screen.findByText(bio)).toBeInTheDocument();});
    });

    //unit test
    it('loads the sort', () => {
        const bio = authState.userReducer?.user?.bio || '';
        const username = authState.userReducer?.user?.username || '';
        renderWithProviders(
            <Routes>
                <Route path={`/profile/username${username}`} element={<Profile />} /> 
            </Routes>,
        {preloadedState: authState});
        waitFor(() => {expect(screen.findByText('Sort')).toBeInTheDocument();});
    }
    )
});