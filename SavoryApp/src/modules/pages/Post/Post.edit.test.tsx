import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {act, screen } from '@testing-library/react';
import PostEdit from './Post.edit';
import Settings from '../Profile/Settings';
import { authState, renderWithProviders } from '../../../setupTests';

describe('Settings component', () => {
  test('renders Settings Page with authenticated user', () => {
    // render the settings page with providers and authenticated preloaded state
    act(() => {renderWithProviders(<Settings/>, {preloadedState: authState})});
    // Check if 'Settings Page' text is present in the document
    expect(screen.getByText('Settings Page')).toBeInTheDocument();
    });
});
  
describe('PostEdit component', () => {
  test('renders PostEdit component', () => {
    act(() => {renderWithProviders(<PostEdit/>, {preloadedState: authState})});
    // Check if the main elements are present in the document
    // expect(screen.getByTestId('recipe-image')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-form')).toBeInTheDocument();
    // Add more checks for other elements as needed
  });
}); 