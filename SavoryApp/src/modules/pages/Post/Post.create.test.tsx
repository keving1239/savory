import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {act, screen, waitFor } from '@testing-library/react';
import PostCreate from './Post.create';
import Settings from '../Profile/Settings';
import { authState, renderWithProviders } from '../../../setupTests';


describe('Settings component', () => {
  // render the settings page with providers and authenticated preloaded state
  beforeEach(async () => {
    act(() => {renderWithProviders([{path: 'settings', elem: <Settings/>}], '/settings', {preloadedState: authState})});
    await waitFor(() => {expect(screen.getByTestId('mui-avatar')).toBeInTheDocument()});
  });
  test('renders Settings Page with authenticated user', () => {
    // Check if 'Settings Page' text is present in the document
    expect(screen.getByText('Settings Page')).toBeInTheDocument();
  });
});
  
describe('PostCreate component', () => {
  beforeEach(async () => {
    act(() => {renderWithProviders([{path: 'post/new', elem: <PostCreate/>}], '/post/new', {preloadedState: authState})});
    await waitFor(() => {expect(screen.getByTestId('mui-avatar')).toBeInTheDocument()});
  });
  test('renders PostCreate component', () => {
    expect(screen.getByText('Share Your Recipe!')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-form')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-submit')).toBeInTheDocument();
  });
});  