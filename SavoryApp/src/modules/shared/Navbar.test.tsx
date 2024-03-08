import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { authState, renderWithProviders } from '../../setupTests';
import { RootState } from '../../redux/store';
import { mocked } from "jest-mock";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingAccount from './LoadingAccount';

// mock auth0
jest.mock('@auth0/auth0-react', () => ({
    ...jest.requireActual('@auth0/auth0-react'),
    useAuth0: jest.fn(),
}));
const mockUseAuth0 = mocked(useAuth0, {shallow: false});
const testToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxnTXlwWWkweTNzbU5FdTdZUVpVayJ9.eyJodHRwOi8vbG9jYWxob3N0OjgwODAvc2F2b3J5L2luaXR0b3dpbml0L2VtYWlsIjoidGFzdGUudGVzdGVyQHNhdm9yeS5jb20iLCJodHRwOi8vbG9jYWxob3N0OjgwODAvc2F2b3J5L2luaXR0b3dpbml0L3JvbGVzIjoiIiwiaXNzIjoiaHR0cHM6Ly9kZXYtdDZ2c3B1YzhxcnNzYWFyYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjVlOGE5YmE1MTRlZDU0ZGEwYjE0MDYyIiwiYXVkIjpbImh0dHBzOi8vZGV2LXQ2dnNwdWM4cXJzc2FhcmMudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi10NnZzcHVjOHFyc3NhYXJjLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MDk3NDc1NTcsImV4cCI6MTcwOTgzMzk1NywiYXpwIjoiUU9objQ3SThWUXBDZDNRUzhyOTh1NnFVWkFqVkNKS3QiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.azYcv8vb8Y3PsozDzzR3uhwmrM6s1yOUyH2d6LeEYbqP2DTaGvfNbqrZ3EkX2rZcvxqQV6UZXq87ieClgeoG9l57NBAo_eDeZdT2T-RSJ6afI23RWO1StAGgW7wjL9I4XoX6_Ez6JBqKi8yoF8vvGoOZfX1OvfCUX_VGyi0LweyET6sUq0d58loSI2qv_a8PQd6iWnHyAhabbp5GSfw4wx6OiY63yM8Q6mscHY1S9AqYr3n7RCMDaL42X1Zcd3rLEm36q94pZLrMxchS8WUqXStJ_IERHUGhto0hzVbhdgsQNiVqo5CG9YOxmTYYoU4Ozx5VVHF6m2XwVbVVKE6-vw';
const user = {
    name: "savory.taste.tester",
    email: "taste.tester@savory.com",
    picture: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
// mock fetch
(global as any).fetch = jest.fn();

const clickAvatar = () => {fireEvent.click(screen.getByTestId('mui-avatar'))};
function renderBeforeEach({ state, expected, action }:
    {state?: Partial<RootState>, expected: string, action?: () => void} ) {
    return beforeEach(async () => {
        mockUseAuth0.mockReturnValue({
            isAuthenticated: true, user: user, isLoading: false,
            getAccessTokenWithPopup: jest.fn().mockImplementation(() => Promise.resolve(testToken)), 
            logout: jest.fn(), handleRedirectCallback: jest.fn(),
            loginWithRedirect: jest.fn(), loginWithPopup: jest.fn(),
            getAccessTokenSilently: jest.fn(), getIdTokenClaims: jest.fn(),
        });
        jest.spyOn(global, 'fetch').mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
            const url = typeof input === 'string' ? input : (input as Request).url;
            if (url === `http://localhost:8080/api/auth/isAdmin`) {
                return Promise.resolve({json: () => Promise.resolve(false)} as Response);
            }  else if (url === `http://localhost:8080/api/person/byEmail/${user.email}`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({id: 105, username: "savory.taste.tester", 
                        email: "taste.tester@savory.com", img: '', bio: 'Hi, I am a tester for Savory!'})
                } as Response);
            } else if (url === `http://localhost:8080/api/posts/byUserId/105?pageNumber=1`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve([])
                } as Response);
            } else if (url === `http://localhost:8080/api/interaction/users/105`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve([])
                } as Response);
            } else if (url === `http://localhost:8080/api/person/emailExists/${user.email}`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(true)
                } as Response);
            } else return Promise.resolve(new Error('Bad URL'));
        });
        act(() => {renderWithProviders([{path: 'login', elem: <LoadingAccount/> },], '/', {preloadedState: state})});
        await waitFor(() => {expect(screen.getByTestId(expected)).toBeInTheDocument()});
        if(action) act(action);
    });
}

// COMPONENT RENDERING UNIT TESTS
describe('Unuthenticated Navigate Options', () => {
    renderBeforeEach({expected: 'savory-home-button'});
    test('Renders Savory, About, and Avatar', () => {
        expect(screen.getByText('SAVORY')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByTestId('mui-avatar')).toBeInTheDocument();
    });
    test('Does not render Add Post, Bookmarks, or Search', () => {
        expect(screen.queryByText('Bookmarks')).not.toBeInTheDocument();
    });
});
describe('Authenticated Navigate Options', () => {
    renderBeforeEach({expected: 'savory-home-button', state: authState});
    test('Renders Add Post, Bookmarks, and Search', () => {
        expect(screen.getByText('Add Post')).toBeInTheDocument();            
        expect(screen.getByText('Bookmarks')).toBeInTheDocument();            
        expect(screen.getByTestId('savory-search-bar')).toBeInTheDocument();
    });
});
describe('Unauthenticated Profile Options', () => {
    renderBeforeEach({expected: 'mui-avatar', action:clickAvatar});
    test('Renders Login in Profile Options when NOT authenticated', () => {
        expect(screen.getByText('Log in')).toBeInTheDocument();
    });
    test('Does not render Profile, Settings, Logout when NOT authenticated', () => {
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });
});
describe('Authenticated Profile Options', () => {
    renderBeforeEach({expected: 'mui-avatar', action: clickAvatar, state: authState});
    test('Renders Profile, Settings, Logout when NOT authenticated', () => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });
});

// LOGIN INTEGRATION TEST
describe('Login Enables Authenticated Navigate/Profile Options', () => {
    renderBeforeEach({expected: 'mui-avatar', action: clickAvatar});
    test('Login in will update the Navbar Navigate/Profile Options', async () => {
        expect(screen.queryByText('Bookmarks')).not.toBeInTheDocument();
        act(() => {fireEvent.click(screen.getByTestId('login-button'))});
        await waitFor(() => {expect(screen.getByText('Bookmarks')).toBeInTheDocument()});
    });
});