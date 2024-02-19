import React from 'react';
import {screen } from '@testing-library/react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PostCreate from './Post.create';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Error404 from '../../shared/Error404';
import Settings from '../Profile/Settings';
import ProfileTile, {TileProps} from '../Profile/Profile.tile';

describe('ProfileTile', () => {
  const defaultProps: TileProps = 
  {
    username: 'John Doe',
    img: '/profile-image.jpg',
    bio: 'A sample bio.',

  };
  test('renders ProfileTile component with default props', () => {
    const { getByText, getByAltText } = render(<ProfileTile {...defaultProps} />);

    // Verify that the rendered content includes the provided username, bio, and image alt text
    getByText(defaultProps.username);
    getByText(defaultProps.bio);
    getByAltText(defaultProps.username);
  });

  test('renders ProfileTile component with custom props', () => {
    const customProps: TileProps = {
      username: 'Custom User',
      img: '/custom-image.jpg',
      bio: 'Custom bio.',
    };

    const { getByText, getByAltText } = render(<ProfileTile {...customProps} />);

    // Verify that the rendered content includes the custom username, bio, and image alt text
    getByText(customProps.username);
    getByText(customProps.bio);
    getByAltText(customProps.username);
  });

  test('renders ProfileTile component with default image if no image provided', () => {
    const propsWithoutImg: TileProps = {
      username: 'No Image User',
      bio: 'No image bio.',
    };

    const { getByAltText } = render(<ProfileTile {...propsWithoutImg} />);

    // Verify that the rendered content includes the default image alt text
    getByAltText(propsWithoutImg.username);
  });
});



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

    it('should render the Settings Page', () => {
      render(<Settings/>);
      screen.debug();
    });

    



  });


 




