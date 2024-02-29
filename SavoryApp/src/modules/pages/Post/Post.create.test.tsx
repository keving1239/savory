import React from 'react';
import {screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PostCreate from './Post.create';
import { Provider } from 'react-redux';
import Settings from '../Profile/Settings';
import { useSelector } from 'react-redux';
import configureStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom';
import { InteractionsState } from '../../../redux/Interactions/interactions-slice';
import { UserState } from '../../../redux/User/user-slice';
import { LocalRecipesState } from '../../../redux/Recipes/recipes-slice';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

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

describe('Settings component', () => {
  test('renders Settings Page with authenticated user', () => {
    // Mock the useSelector to return a fake RootState
    (useSelector as jest.Mock).mockReturnValue(fakeState);

    render(
      <Provider store={mockStore({})}>
        <BrowserRouter>
          <Settings />
        </BrowserRouter>
      </Provider>
    );

    // Check if 'Settings Page' text is present in the document
    expect(screen.getByText('Settings Page')).toBeInTheDocument();

    });
  });

  
describe('PostCreate component', () => {
  const mockStore = configureStore([]);
  const fakeStateV2 = {
    user: {
      isAuthenticated: true,
    },
    // other parts of the RootState as needed
  };

  beforeEach(() => {
    // Mock the useSelector to return a fake RootState
    (useSelector as jest.Mock).mockReturnValue(fakeStateV2);
  });

  test('renders PostCreate component', () => {
    render(
      <Provider store={mockStore(fakeStateV2)}>
        <MemoryRouter>
          <PostCreate />
        </MemoryRouter>
      </Provider>
    );

    // Check if the main elements are present in the document
    expect(screen.getByText('Share Your Recipe!')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    // Add more checks for other elements as needed
  });
});  