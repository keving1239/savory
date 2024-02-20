import React from 'react';
import {screen } from '@testing-library/react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import PostCreate from './Post.create';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Error404 from '../../shared/Error404';
import Settings from '../Profile/Settings';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import configureStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom';
import Profile from '../Profile/Profile';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));
const fakeState: RootState = {
  user: {
    isAuthenticated: true,
    user: null,
    token: null,
    loading: false,
  },
  recipes: {
    recipes: [], // Add fake recipes as needed
    loading: false,
  },
  interactions: {
    interactions: {}, // Add fake interactions as needed
    loading: false,
  },
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

// describe('Profile component', () => {
//   const mockStore = configureStore([]);
//   const fakeStateV3 = {
//     user: {
//       user: {
//         id: 420,
//         username: 'testUser',
//         img: 'testImage.png',
//         bio: 'This is a test bio.',
//         role: false,
//       },
//     },
//     // other parts of the RootState as needed
//   };

//   beforeEach(() => {
//     // Mock the useSelector to return a fake RootState
//     (useSelector as jest.Mock).mockReturnValue(fakeStateV3);

//     // Mock the useParams to return a username
//     (useParams as jest.Mock).mockReturnValue({ username: 'testUser' });
//   });

//   afterEach(() => {
//     // Clear the mock after each test
//     jest.clearAllMocks();
//   });

//   test('renders Profile component', () => {
//     render(
//       <Provider store={mockStore(fakeStateV3)}>
//         <MemoryRouter initialEntries={['/profile/testUser']}>
//           <Route path="/profile/:username">
//             <Profile />
//           </Route>
//         </MemoryRouter>
//       </Provider>
//     );

//     // Check if the main elements are present in the document
//     expect(screen.getByText('testUser')).toBeInTheDocument();
//     expect(screen.getByText('This is a test bio.')).toBeInTheDocument();
//     // Add more checks for other elements as needed
//   });


// });

  

  