import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PostCreate from './Post.create';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
  
  describe('PostCreate component', () => {
    it('renders without crashing', () => {
      render(
        <MemoryRouter>
          <PostCreate />
        </MemoryRouter>
      );
    });
  
    // Other tests...
  });