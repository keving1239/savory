import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import StandardLayout from '../StandardLayout';
import { authState, renderWithProviders } from '../../setupTests';
import { RootState } from '../../redux/store';
import StandardLayoutRouter from '../Router';
import { Route, Routes } from 'react-router';
import LoadingAccount from './LoadingAccount';

const navbarAndRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<StandardLayout/>}>
                <Route index element={<div/>}/>
                <Route path='profile/:username' element={<div/>}/>
                <Route path="login" element={<LoadingAccount/>}/>
                <Route path="feed" element={<div/>}/>
                <Route path='feed/:interaction' element={<div/>}/>
                <Route path='post/new' element={<div/>}/>
                <Route path='settings' element={<div/>}/>
            </Route>
        </Routes>
    );
}

const clickAvatar = () => {fireEvent.click(screen.getByTestId('mui-avatar'))};
function renderBeforeEach({ state, expected, action }:
    {state?: Partial<RootState>, expected: string, action?: () => void} ) {
    return beforeEach(async () => {
        act(() => {renderWithProviders(<StandardLayout/>, {preloadedState: state})});
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
        expect(screen.queryByText('Add Post')).not.toBeInTheDocument();
        expect(screen.queryByText('Bookmarks')).not.toBeInTheDocument();
        expect(screen.queryByTestId('savory-search-bar')).not.toBeInTheDocument();
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
        expect(screen.queryByText('Settings')).not.toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
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

// LINK ROUTING UNIT TESTS
describe('Unauthenticated Navigation Link Routing', () => {
    renderBeforeEach({expected: 'savory-home-button'});
    test('SAVORY link takes the user to the Splash page', () => {
        act(() => {fireEvent.click(screen.getByText('SAVORY'))});
        waitFor(() => {expect(window.location.pathname).toBe('/')});
    });
    test('About link takes the user to the Splash page', () => {
        act(() => {fireEvent.click(screen.getByText('About'))});
        waitFor(() => {expect(window.location.pathname).toBe('/')});
    });
});
describe('Authenticated Navigation Link Routing', () => {
    renderBeforeEach({expected: 'savory-search-bar', state: authState});
    afterEach(() => jest.restoreAllMocks());
    test('SAVORY link takes the user to the Feed page', () => {
        act(() => {fireEvent.click(screen.getByText('SAVORY'))});
        waitFor(() => {expect(window.location.pathname).toBe('/feed')});
    });
    test('Add Post link takes the user to the Create Recipe page', () => {
        act(() => {fireEvent.click(screen.getByText('Add Post'))});
        waitFor(() => {expect(window.location.pathname).toBe('/post/new')});
    });
    test('Bookmarks link takes the user to the Bookmarks page', () => {
        act(() => {fireEvent.click(screen.getByText('Bookmarks'))});
        waitFor(() => {expect(window.location.pathname).toBe('/feed/bookmarks')});
    });
    test('Search bar takes the user to the Search Feed page', () => {
        act(() => {
            const input = screen.getByTestId('savory-search-text').querySelector('input') as HTMLInputElement;
            const form = screen.getByTestId('savory-search-bar');
            fireEvent.focus(input);
            fireEvent.input(input, { target: { value: 'American' } });
            fireEvent.submit(form);
        });
        waitFor(() => {expect(window.location.pathname).toBe('/feed/search/american')});
    });
});
describe('Unauthenticated Profile Option Link Routing', () => {
    renderBeforeEach({expected: 'mui-avatar', action: clickAvatar});
    afterEach(() => jest.restoreAllMocks());
    test('Log in link takes the user to the Login page', () => {
        act(() => {fireEvent.click(screen.getByText('Log in'))});
        waitFor(() => {expect(window.location.pathname).toBe('/login')});
    });
});
describe('Authenticated Profile Option Link Routing', () => {
    renderBeforeEach({expected: 'mui-avatar', action: clickAvatar, state: authState});
    afterEach(() => jest.restoreAllMocks());
    test('Profile link takes the user to their Profile page', () => {
        const username = authState.userReducer?.user?.username || 'NotFound';
        act(() => {fireEvent.click(screen.getByText('Profile'))});
        waitFor(() => {expect(window.location.pathname).toBe(`/profile/${username}`)});
    });
    test('Settings link takes the user to the Settings page', () => {
        act(() => {fireEvent.click(screen.getByText('Settings'))});
        waitFor(() => {expect(window.location.pathname).toBe('/settings')});
    });
    test('Logout link takes the user to the Splash page', () => {
        act(() => {fireEvent.click(screen.getByText('Logout'))});
        waitFor(() => {expect(window.location.pathname).toBe('/')});
    });
});

// LOGIN/LOGOUT INTEGRATION TESTING
describe('Login Enables Authenticated Navigate/Profile Options', () => {
    renderBeforeEach({expected: 'mui-avatar', action: clickAvatar});
    test('Loggin in will update the Navbar Navigate/Profile Options', () => {
        expect(screen.queryByText('Bookmarks')).not.toBeInTheDocument();
        act(() => {fireEvent.click(screen.getByText('Log in'));});
        screen.debug();
        waitFor(()=>{
            screen.debug();
            expect(screen.getByText('alsdkhfjksdf')).toBeInTheDocument()
            expect(screen.getByText('Bookmarks')).toBeInTheDocument()
        });
    });
});