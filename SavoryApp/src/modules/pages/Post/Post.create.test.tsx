import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {act, screen } from '@testing-library/react';
import PostCreate from './Post.create';
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
  
describe('PostCreate component', () => {
  test('renders PostCreate component', () => {
    act(() => {renderWithProviders(<PostCreate/>, {preloadedState: authState})});
    // Check if the main elements are present in the document
    expect(screen.getByText('Share Your Recipe!')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-form')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-submit')).toBeInTheDocument();
    // Add more checks for other elements as needed
  });
});  