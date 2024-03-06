import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from '../../../redux/store';
import StandardLayout from '../../StandardLayout';
import { ThemeProvider } from '@emotion/react';
import createAppTheme from '../../../app/App.theme';
import { UserState } from '../../../redux/User/user-slice';
import { LocalRecipesState } from '../../../redux/Recipes/recipes-slice';
import { InteractionsState } from '../../../redux/Interactions/interactions-slice';
import { useSelector } from 'react-redux';
import Feed from '../../shared/Feed';

/*
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
            id: 12,
            username: 'batman',
            img: '',
            bio: 'im batman'
        }),
    })) as jest.Mock;
    */

(global as any).fetch = jest.fn();

const mockUser = {
    id: 12,
    username: 'batman',
    email: 'test@example.com',
    img: 'test.jpg',
    bio: 'Test bio'
};

// Create a mock Redux store with the desired initial state
const mockStore = configureStore<RootState>([]);
const initialState: RootState = {
    persistedReducer: {
        userReducer: {
            user: mockUser,
            isAuthenticated: true,
            isAdmin: false
        },
        recipesReducer: {
            recipes: {},
            page: 1,
            sort: "A"
        },
        interactionsReducer: {
            interactions: {},
        },
        themeReducer: {
            mode: "light"
        },
        _persist: {
            version: -1,
            rehydrated: true,
        }
    }
};

const store = mockStore(initialState);

/*
  interface FakeState {
    persistedReducer: {
        userReducer: UserState;
        recipesReducer: LocalRecipesState;
        interactionsReducer: InteractionsState;
    };
  }
  const fakeState: FakeState = {
    persistedReducer: {
      userReducer: {
        isAuthenticated: true,
        isAdmin: false,
        user: null,
        token: null,
      } as UserState,
      recipesReducer: {
        recipes: {}, // Add fake recipes as needed
      } as LocalRecipesState,
      interactionsReducer: {
        interactions: {}, // Add fake interactions as needed
      } as InteractionsState,
    }
  };
  const mockStore = configureStore([]);
  */

const FeedComponent = () => {
    return <div>Avocado Toast</div>
};


describe('Profile', () => {

    // other parts of the RootState as needed

    (global as any).fetch = jest.fn();

    /*
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
              id: 12,
              username: 'batman',
              img: '',
              bio: 'im batman'
          }),
      })) as jest.Mock;
      */

    beforeEach(() => {
        const username = 'batman'
        jest.spyOn(global, 'fetch').mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
            const url = typeof input === 'string' ? input : (input as Request).url;

            if (url === `http://localhost:8080/api/person/byUsername/${username}`) {
                return Promise.resolve({
                    json: () => Promise.resolve({
                        id: 12,
                        username: 'batman',
                        img: '',
                        bio: 'im batman'
                    })
                } as Response);
            } else if (url === `http://localhost:8080/api/posts/byUserId/12?pageNumber=1`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(
                        [{"postId":270,"userId":12,"headline":"Teriyaki Chicken","ingredients":"Chicken thighs or breasts,Soy sauce,Brown sugar,Garlic,Ginger","recipe":"Begin by gathering your ingredients and preparing them as needed. In a suitable cooking vessel, combine the main ingredients together. Season to taste with salt, pepper, and any other desired spices. Heat the mixture over medium heat until it reaches the desired temperature. While it's cooking, make sure to stir occasionally to prevent sticking. Once the mixture is cooked through, remove it from the heat and let it cool slightly. Serve the dish hot or cold, depending on your preference. Optionally, garnish with fresh herbs or a squeeze of citrus for added flavor. Enjoy your creation with friends and family! Don't forget to clean up afterward for a tidy kitchen.","img":"https://images.themodernproper.com/billowy-turkey/production/posts/2022/TeriyakiChicken_4.jpg?w=1200&h=630&q=82&fm=jpg&fit=crop&dm=1687729645&s=7734d7ccfa788022a3d8acd7005770e3","tags":"TeriyakiTemptation,AsianInspiration,SweetAndSavory","postdate":"2024-01-20T18:25:33.347+00:00"}]
                    )
                } as Response);
            } else if (url === `http://localhost:8080/api/interaction/profile/interactions/12`) {
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

    it('loads the correct username', async () => {
        const route = `/profile/batman`;

        render(
            <Provider store={store}>
                <ThemeProvider theme={createAppTheme("light")}>
                    <MemoryRouter initialEntries={[route]}>
                        <Routes>
                            <Route path="/profile/:username" element={<Profile />} />
                        </Routes>
                    </MemoryRouter>
                </ThemeProvider>
            </Provider>
        );

        const usernameElement = await screen.findByText(`batman`);
        //   expect(screen.getByText("Avocado")).toBeInTheDocument();
        expect(usernameElement).toBeInTheDocument();
    });
});