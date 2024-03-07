// import React from 'react';
// import { setupServer } from 'msw/node'
// import rest from 'msw'
// import {screen, waitFor } from '@testing-library/react';
// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// // import { MemoryRouter } from 'react-router-dom';
// import PostCreate from '../pages/Post/Post.create';
// import { Provider } from 'react-redux';
// import Settings from '../pages/Profile/Settings';
// import { useSelector } from 'react-redux';
// import configureStore from 'redux-mock-store'
// import { MemoryRouter, Routes, Route} from 'react-router-dom';
// import { InteractionsState } from '../../redux/Interactions/interactions-slice'; 
// import { UserState } from '../../redux/User/user-slice'; 
// import { LocalRecipesState } from '../../redux/Recipes/recipes-slice';
// import { RootState } from '../../redux/store'; 
// import Feed from './Feed';
// import Post from '../pages/Post/Post';
// import axios from 'axios';
// import { ThemeProvider } from '@emotion/react';
// import createAppTheme from '../../app/App.theme';



// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useSelector: jest.fn(),
//   useParams: jest.fn(),
//   useNavigate: jest.fn(),
// }));

// interface FakeState {
//   persistedReducer: {
//       userReducer: UserState;
//       recipesReducer: LocalRecipesState;
//       interactionsReducer: InteractionsState;
//   };
// }
// const fakeState: FakeState = {
//   persistedReducer: {
//     userReducer: {
//       isAuthenticated: true,
//       isAdmin: false,
//       user: null,
//       token: null,
//     } as UserState,
//     recipesReducer: {
//       recipes: {}, // Add fake recipes as needed
//     } as LocalRecipesState,
//     interactionsReducer: {
//       interactions: {}, // Add fake interactions as needed
//     } as InteractionsState,
//   }
// };
// // const mockStore = configureStore([]);

// // (global as any).fetch = jest.fn();

// const mockUser = {
//     id: 12,
//     username: 'batman',
//     email: 'test@example.com',
//     img: 'test.jpg',
//     bio: 'Test bio'
// };

// // Create a mock Redux store with the desired initial state
// const mockStore = configureStore<RootState>([]);
// const initialState: RootState = {
//     persistedReducer: {
//         userReducer: {
//             user: mockUser,
//             isAuthenticated: true,
//             isAdmin: false
//         },
//         recipesReducer: {
//             recipes: {},
//             page: 1,
//             sort: "A"
//         },
//         interactionsReducer: {
//             interactions: {},
//         },
//         themeReducer: {
//             mode: "light"
//         },
//         _persist: {
//             version: -1,
//             rehydrated: true,
//         }
//     }
// };

// const store = mockStore(initialState);





// // // Integration Test for Feed to see if Avacado Toast appears on the main feed page.
// // describe('Feed Component Integration Test', () => {
// //   it('renders the component with mocked data', async () => {
// //     // Define the initial state for the store
// //     const initialState = {
// //       persistedReducer: {
// //         userReducer: {
// //           user: { id: 1, username: 'testUser' },
// //           isAuthenticated: true,
// //         },
// //         recipesReducer: {
// //           sort: 'A',
// //           recipes: {
// //             1: {
// //               id: 1,
// //               title: 'Test Recipe 1',
// //               // Add other necessary properties
// //             },
// //             // Add more test recipes as needed
// //           },
// //           page: 1,
// //         },
// //         interactionsReducer: {
// //           interactions: {
// //             1: {
// //               postId: 1,
// //               userId: 1,
// //               liked: false,
// //               bookmarked: false,
// //               shared: false,
// //             },
// //             // Add more interactions as needed
// //           },
// //         },
// //       },
// //     };

// //     // Create a mocked Redux store with the initial state
// //     const store = mockStore(initialState);

// //     // Render the component with the mocked Redux store and Router
// //     render(
// //       <Provider store={store}>
// //         <BrowserRouter>
// //           <Feed />
// //         </BrowserRouter>
// //       </Provider>
// //     );

// //     const recipeTitleElement = screen.getByText('Test Recipe 1');
// //     expect(recipeTitleElement).toBeInTheDocument();
// //   });
// // });


// // const storeForFeed = mockStore(initialState)

// // const FeedComponent = () => {
// //   return <div>Avocado Toast</div>
// // };

// // describe('Feed', () => {
// //   it('loads avocado toast', async () => {
// //       const route = '/feed';

// //       render(
// //           <Provider store={storeForFeed}>
// //               <MemoryRouter initialEntries={[route]}>
// //                   <Routes>
// //                    <Route path="/feed" element={<FeedComponent />} />
// //                   </Routes>
// //               </MemoryRouter>
// //           </Provider>
// //       );

// //       await waitFor(() => {
// //         // Debug the current state of the virtual DOM
// //         screen.debug();
// //       });

// //       const feedElement = await screen.findByText(`Avocado Toast`);
// //       expect(feedElement).toBeInTheDocument();
// //       // expect(screen.getByLabelText('Baked Ziti')).toBeInTheDocument();
// //   });
// // });



// describe('Feed', () => {

//   // other parts of the RootState as needed

//   (global as any).fetch = jest.fn();

//   /*
//   global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve({
//             id: 12,
//             username: 'batman',
//             img: '',
//             bio: 'im batman'
//         }),
//     })) as jest.Mock;
//     */
//     beforeEach(() => {
//       const username = 'batman'
//       const pageNumber = 1
//       jest.spyOn(global, 'fetch').mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
//           const url = typeof input === 'string' ? input : (input as Request).url;
    
//           if (url === `${process.env.REACT_APP_URL_KEY}/api/posts/allWithUsername?pageNumber=${pageNumber}`) {
//                   return Promise.resolve({
//                   json: () => Promise.resolve({
//                       postId: 279,
//                       userId: 29,
//                       Headline: 'Avocado Toast',
//                       Ingredients: 'Bread,Avocado,Lemon,Salt,Optional toppings (tomatoes eggs or feta cheese)',
//                       Recipe: "Begin by gathering your ingredients and preparing them as needed. In a suitable cooking vessel, combine the main ingredients together. Season to taste with salt, pepper, and any other desired spices. Heat the mixture over medium heat until it reaches the desired temperature. While it's cooking, make sure to stir occasionally to prevent sticking. Once the mixture is cooked through, remove it from the heat and let it cool slightly. Serve the dish hot or cold, depending on your preference. Optionally, garnish with fresh herbs or a squeeze of citrus for added flavor. Enjoy your creation with friends and family! Don't forget to clean up afterward for a tidy kitchen.",
//                       PostDate: "2024-03-01 16:06:15.290",
//                       Img: "https://mojo.generalmills.com/api/public/content/iCXFwJd80U6TMhTZKYyA-w_gmi_hi_res_jpeg.jpeg?v=86a29367&t=466b54bb264e48b199fc8e83ef1136b4",
//                       Tags: "TunaTreat,SandwichSatisfaction,LunchtimeFavorite"
    
//                   })
//               } as Response)
//           } else if (url === `${process.env.REACT_APP_URL_KEY}/api/posts/byUserId/12?pageNumber=1`) {
//               return Promise.resolve({
//                   status: 200,
//                   json: () => Promise.resolve(
//                       [{"postId":270,"userId":12,"headline":"Teriyaki Chicken","ingredients":"Chicken thighs or breasts,Soy sauce,Brown sugar,Garlic,Ginger","recipe":"Begin by gathering your ingredients and preparing them as needed. In a suitable cooking vessel, combine the main ingredients together. Season to taste with salt, pepper, and any other desired spices. Heat the mixture over medium heat until it reaches the desired temperature. While it's cooking, make sure to stir occasionally to prevent sticking. Once the mixture is cooked through, remove it from the heat and let it cool slightly. Serve the dish hot or cold, depending on your preference. Optionally, garnish with fresh herbs or a squeeze of citrus for added flavor. Enjoy your creation with friends and family! Don't forget to clean up afterward for a tidy kitchen.","img":"https://images.themodernproper.com/billowy-turkey/production/posts/2022/TeriyakiChicken_4.jpg?w=1200&h=630&q=82&fm=jpg&fit=crop&dm=1687729645&s=7734d7ccfa788022a3d8acd7005770e3","tags":"TeriyakiTemptation,AsianInspiration,SweetAndSavory","postdate":"2024-01-20T18:25:33.347+00:00"}]
//                   )
//               } as Response);
//           } else if (url === `${process.env.REACT_APP_URL_KEY}/api/interaction/profile/interactions/12`) {
//               return Promise.resolve({
//                   status: 200,
//                   json: () => Promise.resolve(
//                       {}
//                   )
//               } as Response);
//           } else {
//               return Promise.reject(new Error('Unknown URL'));
//           }
//       });
//     });
//     it('loads Avocado Toast', async () => {
//       const route = '/feed';
    
//       render(
//         <Provider store={store}>
//           <ThemeProvider theme={createAppTheme("light")}>
//             <MemoryRouter initialEntries={[`/feed`]}>
//               <Routes>
//                 <Route path="/feed" element={<Feed />} />
//               </Routes>
//             </MemoryRouter>
//           </ThemeProvider>
//         </Provider>
//       );
    
//       const usernameElement = await screen.findByText('Avocado Toast');
//       expect(usernameElement).toBeInTheDocument();
//     });
    
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from '../../redux/store';
import StandardLayout from '../StandardLayout';
import { ThemeProvider } from '@emotion/react';
import createAppTheme from '../../app/App.theme';
import { useSelector } from 'react-redux';
import Feed from './Feed';
import { Recipe } from '../../redux/Recipes/recipes-slice';
import { authState, renderWithProviders } from '../../setupTests';

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

// (global as any).fetch = jest.fn();

const mockUser = {
    id: 12,
    username: 'batman',
    email: 'test@example.com',
    img: 'test.jpg',
    bio: 'Test bio'
};

// Create a mock Redux store with the desired initial state
const mockStore = configureStore<RootState>([]);
const exampleRecord: Record<number, Recipe> = {
  270: {
    id: 270,
    userId: 12,
    title: "Avocado",
    ingredients: [
      "Chicken thighs or breasts",
      "Soy sauce",
      "Brown sugar",
      "Garlic",
      "Ginger",
    ],
    recipe:
      "Begin by gathering your ingredients and preparing them as needed. In a suitable cooking vessel, combine the main ingredients together. Season to taste with salt, pepper, and any other desired spices. Heat the mixture over medium heat until it reaches the desired temperature. While it's cooking, make sure to stir occasionally to prevent sticking. Once the mixture is cooked through, remove it from the heat and let it cool slightly. Serve the dish hot or cold, depending on your preference. Optionally, garnish with fresh herbs or a squeeze of citrus for added flavor. Enjoy your creation with friends and family! Don't forget to clean up afterward for a tidy kitchen.",
    img:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2022/TeriyakiChicken_4.jpg?w=1200&h=630&q=82&fm=jpg&fit=crop&dm=1687729645&s=7734d7ccfa788022a3d8acd7005770e3",
    tags: ["TeriyakiTemptation", "AsianInspiration", "SweetAndSavory"],
    date: "2024-01-20T18:25:33.347+00:00",
    author: "RandomAuthor"
  },
};
// const initialState: RootState = {
//     persistedReducer: {
//         userReducer: {
//             user: mockUser,
//             isAuthenticated: true,
//             isAdmin: false
//         },
//         recipesReducer: {
//             recipes: exampleRecord,
//             page: 1,
//             sort: "A"
//         },
//         interactionsReducer: {
//             interactions: {},
//         },
//         themeReducer: {
//             mode: "light"
//         },
//         _persist: {
//             version: -1,
//             rehydrated: true,
//         }
//     }
// };

// const store = mockStore(initialState);

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




describe('Feed', () => {

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
        const pageNumber = 1;
        
        (global as any).fetch = jest.fn().mockImplementation((input: RequestInfo | URL, init?: RequestInit) => 
        {
            const url = typeof input === 'string' ? input : (input as Request).url;
            console.log("In Statement")
          if (url === `${process.env.REACT_APP_URL_KEY}/api/posts/allWithUsername?pageNumber=1`) 
          {
                  console.log("In Statement")      
                  return Promise.resolve({
                  json: () => Promise.resolve([{"postId":270,"userId":12,"headline":"Avocado","ingredients":"Chicken thighs or breasts,Soy sauce,Brown sugar,Garlic,Ginger","recipe":"Begin by gathering your ingredients and preparing them as needed. In a suitable cooking vessel, combine the main ingredients together. Season to taste with salt, pepper, and any other desired spices. Heat the mixture over medium heat until it reaches the desired temperature. While it's cooking, make sure to stir occasionally to prevent sticking. Once the mixture is cooked through, remove it from the heat and let it cool slightly. Serve the dish hot or cold, depending on your preference. Optionally, garnish with fresh herbs or a squeeze of citrus for added flavor. Enjoy your creation with friends and family! Don't forget to clean up afterward for a tidy kitchen.","img":"https://images.themodernproper.com/billowy-turkey/production/posts/2022/TeriyakiChicken_4.jpg?w=1200&h=630&q=82&fm=jpg&fit=crop&dm=1687729645&s=7734d7ccfa788022a3d8acd7005770e3","tags":"TeriyakiTemptation,AsianInspiration,SweetAndSavory","postdate":"2024-01-20T18:25:33.347+00:00"}])
              } as Response)
            } else if (url === `${process.env.REACT_APP_URL_KEY}/api/posts/byUserId/12?pageNumber=1`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(
                        [{"postId":270,"userId":12,"headline":"Teriyaki Chicken","ingredients":"Chicken thighs or breasts,Soy sauce,Brown sugar,Garlic,Ginger","recipe":"Begin by gathering your ingredients and preparing them as needed. In a suitable cooking vessel, combine the main ingredients together. Season to taste with salt, pepper, and any other desired spices. Heat the mixture over medium heat until it reaches the desired temperature. While it's cooking, make sure to stir occasionally to prevent sticking. Once the mixture is cooked through, remove it from the heat and let it cool slightly. Serve the dish hot or cold, depending on your preference. Optionally, garnish with fresh herbs or a squeeze of citrus for added flavor. Enjoy your creation with friends and family! Don't forget to clean up afterward for a tidy kitchen.","img":"https://images.themodernproper.com/billowy-turkey/production/posts/2022/TeriyakiChicken_4.jpg?w=1200&h=630&q=82&fm=jpg&fit=crop&dm=1687729645&s=7734d7ccfa788022a3d8acd7005770e3","tags":"TeriyakiTemptation,AsianInspiration,SweetAndSavory","postdate":"2024-01-20T18:25:33.347+00:00"}]
                    )
                } as Response);
            } else if (url === `${process.env.REACT_APP_URL_KEY}/api/interaction/profile/interactions/12`) {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(
                        {}
                    )
                } as Response);
            } else 
            {
                return Promise.reject(new Error('Unknown URL'));
            }
        });
    });

    it('loads the correct username', async () => {
      //   const route = `/feed`;

      //   render(
      //       <Provider store={store}>
      //           <ThemeProvider theme={createAppTheme("light")}>
      //               <MemoryRouter initialEntries={[route]}>
      //                   <Routes>
      //                       <Route path="/feed" element={<Feed />} />
      //                   </Routes>
      //               </MemoryRouter>
      //           </ThemeProvider>
      //       </Provider>
      //   );

      // //   await waitFor(async () => {
      // //     const loadingElement = screen.queryByText(/Loading Recipes.../i);
      // //     expect(loadingElement).toBeInTheDocument();
      // // }, { timeout: 4000 }); // Adjust the timeout as needed

      // // screen.debug()

      //   const usernameElement = await screen.findByText("Avocado");;
      //   //   expect(screen.getByText("Avocado")).toBeInTheDocument();
      const bio = authState.userReducer?.user?.bio || '';
      const username = authState.userReducer?.user?.username || '';
      renderWithProviders(
          <Routes>
              <Route path={`/feed`} element={<Profile />} /> 
          </Routes>,
      {preloadedState: authState});
      waitFor(() => {expect(screen.findByText('Avocado')).toBeInTheDocument();});

    });
});

// it('loads the correct username', () => {
//   const bio = authState.userReducer?.user?.bio || '';
//   const username = authState.userReducer?.user?.username || '';
//   renderWithProviders(
//       <Routes>
//           <Route path={`/profile/username${username}`} element={<Profile />} /> 
//       </Routes>,
//   {preloadedState: authState});
//   waitFor(() => {expect(screen.findByText(bio)).toBeInTheDocument();});
// });