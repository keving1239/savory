import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { authState, renderWithProviders } from '../../../setupTests';

(global as any).fetch = jest.fn();
const tester = authState.userReducer?.user || {id: 0, username: '', email: '', bio: '', img: ''};

describe('Profile', () => {
    beforeEach(async () => {
        jest.spyOn(global, 'fetch').mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
            const url = typeof input === 'string' ? input : (input as Request).url;
            if (url === `${process.env.REACT_APP_URL_KEY}/api/person/byUsername/${tester.username}`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({...tester})
                } as Response);
            } else if (url === `${process.env.REACT_APP_URL_KEY}/api/person/byEmail/${tester.email}`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({...tester})
                } as Response);
            } else if (url === `${process.env.REACT_APP_URL_KEY}/api/posts/byUserId/${tester.id}?pageNumber=1`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve([])
                } as Response);
            } else if (url === `${process.env.REACT_APP_URL_KEY}/api/interaction/users/${tester.id}`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve([])
                } as Response);
            } else if (url === `${process.env.REACT_APP_URL_KEY}/api/person/emailExists/${tester.email}`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(true)
                } as Response);
            } else if (url === `${process.env.REACT_APP_URL_KEY}/api/interaction/profile/interactions/${tester.id}`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(0)
                } as Response);
            } else {
                return Promise.reject(new Error('Unknown URL: ' + url));
            }
        });
        act(() => {renderWithProviders(
            [{path: `profile/:username`, elem: <Profile />},],
            `/profile/${tester.username}`, {preloadedState: authState});});
        await waitFor(() => {expect(screen.getByTestId('mui-avatar')).toBeInTheDocument()});
    });
    // integration test
    it('loads the correct bio and username', () => {
        expect(screen.getByText('savory.taste.tester')).toBeInTheDocument();
        expect(screen.getByText('Hi, I am a tester for Savory!')).toBeInTheDocument();
    });
    //unit test
    it('loads the sort', async () => {
        expect(screen.getByLabelText('Sort')).toBeInTheDocument();
    });
});