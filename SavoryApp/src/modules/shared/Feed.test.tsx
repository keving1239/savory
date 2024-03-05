import React from 'react';
import {http} from 'msw'
import {HttpResponse} from 'msw'
import { setupServer } from 'msw/node'
import rest from 'msw'
import {screen, waitFor } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PostCreate from '../pages/Post/Post.create';
import { Provider } from 'react-redux';
import Settings from '../pages/Profile/Settings';
import { useSelector } from 'react-redux';
import configureStore from 'redux-mock-store'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { InteractionsState } from '../../redux/Interactions/interactions-slice'; 
import { UserState } from '../../redux/User/user-slice'; 
import { LocalRecipesState } from '../../redux/Recipes/recipes-slice';
import { RootState } from '../../redux/store'; 
import Feed from './Feed';
import Post from '../pages/Post/Post';
import axios from 'axios';




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




// // Integration Test for Feed to see if Avacado Toast appears on the main feed page.
// describe('Feed Component Integration Test', () => {
//   it('renders the component with mocked data', async () => {
//     // Define the initial state for the store
//     const initialState = {
//       persistedReducer: {
//         userReducer: {
//           user: { id: 1, username: 'testUser' },
//           isAuthenticated: true,
//         },
//         recipesReducer: {
//           sort: 'A',
//           recipes: {
//             1: {
//               id: 1,
//               title: 'Test Recipe 1',
//               // Add other necessary properties
//             },
//             // Add more test recipes as needed
//           },
//           page: 1,
//         },
//         interactionsReducer: {
//           interactions: {
//             1: {
//               postId: 1,
//               userId: 1,
//               liked: false,
//               bookmarked: false,
//               shared: false,
//             },
//             // Add more interactions as needed
//           },
//         },
//       },
//     };

//     // Create a mocked Redux store with the initial state
//     const store = mockStore(initialState);

//     // Render the component with the mocked Redux store and Router
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Feed />
//         </BrowserRouter>
//       </Provider>
//     );

//     const recipeTitleElement = screen.getByText('Test Recipe 1');
//     expect(recipeTitleElement).toBeInTheDocument();
//   });
// });
// const mockUser = {
//   id: 1,
//   username: 'batman',
//   email: 'test@example.com',
//   img: 'test.jpg',
//   bio: 'Test bio',
//   role: false
// };



// const initialState: RootState = {
//   persistedReducer: {
//       userReducer: {
//           user: mockUser,
//           isAuthenticated: true,
//           isAdmin: false
//       },
//       recipesReducer: {
//           recipes: {},
//           page: 1,
//           sort: "byId"
//       },
//       interactionsReducer: {
//           interactions: {},
//       },
//       themeReducer: {
//         mode: 'dark'
//       },
//       _persist: {
//           version: -1, 
//           rehydrated: true, 
//         }
//   }
// };

// const storeForFeed = mockStore(initialState)

// const FeedComponent = () => {
//   return <div>Avocado Toast</div>
// };

// describe('Feed', () => {
//   it('loads avocado toast', async () => {
//       const route = '/feed';

//       render(
//           <Provider store={storeForFeed}>
//               <MemoryRouter initialEntries={[route]}>
//                   <Routes>
//                    <Route path="/feed" element={<FeedComponent />} />
//                   </Routes>
//               </MemoryRouter>
//           </Provider>
//       );

//       await waitFor(() => {
//         // Debug the current state of the virtual DOM
//         screen.debug();
//       });

//       const feedElement = await screen.findByText(`Avocado Toast`);
//       expect(feedElement).toBeInTheDocument();
//       // expect(screen.getByLabelText('Baked Ziti')).toBeInTheDocument();
//   });
// });
// const handlers = [
//     rest.get('http://localhost:8080/api/posts', async (req, res, ctx) => {
//       // Use http.get to simulate making an API request
//       const apiResponse = await http.get('http://localhost:8080/api/posts');
  
//       // Extract data from the actual API response or use a mock response
//       const responseData = {
//         data: [
//           { id: 1, title: 'Avocado Toast' },
//           // Add more mock data as needed
//         ],
//       };
  
//       return res(
//         ctx.status(apiResponse.statusCode), // Use the actual status code from the API response
//         ctx.json(responseData)
//       );
//     }),
//   ];
  
const server = setupServer(
    // Describe network behavior with request handlers.
    // Tip: move the handlers into their own module and
    // import it across your browser and Node.js setups!
    http.get('http://localhost:8080/api/posts', ({ request, params, cookies }) => {
      return HttpResponse.json([
        {
          id: 1,
          title: 'Avocado Toast',
        },
      ])
    }),
  )

  // Enable request interception.
beforeAll(() => server.listen())

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers())

// Don't forget to clean up afterwards.
afterAll(() => server.close())

describe('Feed Component', () => {
    it('fetches and displays data from the API', async () => {
      render(<Feed />);
  
      // You might need to adjust the following depending on your actual API response structure.
      // For example, if your API returns an array of posts, you might use `await waitFor(() => screen.getAllByText(/.*/));`
      await waitFor(() => screen.getByText('Avocado Toast'));
  
      expect(screen.getByText('Avocado Toast')).toBeInTheDocument();
    });
  });


// describe('Integration Test: My API', () => {
//   it('should fetch data from the API', async () => {
//     // Make a real API request
//     const response = await axios.get('https://your-api-endpoint.com/data');

//     // Perform assertions based on the actual API response
//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty('key', 'value');
//   });
// });

