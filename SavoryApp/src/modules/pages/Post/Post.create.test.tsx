import React from 'react';
import {screen } from '@testing-library/react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PostCreate from './Post.create';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Error404 from '../../shared/Error404';






jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
  
  describe('PostCreate component', () => 
  {
    it('renders without crashing', () => {
      render(
        <MemoryRouter>
          <PostCreate />
        </MemoryRouter>
      );
    });
  
    // Other tests...
    it('should render the Error 404', () => {
      render(<Error404/>);
      screen.debug();
    });
  });


 




