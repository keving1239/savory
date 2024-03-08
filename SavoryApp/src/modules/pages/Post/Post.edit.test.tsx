import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {act, screen, waitFor } from '@testing-library/react';
import PostEdit from './Post.edit';
import Settings from '../Profile/Settings';
import { authState, renderWithProviders } from '../../../setupTests';

describe('Settings component', () => {
  beforeEach(async () => {
    act(() => {renderWithProviders([{path: 'settings', elem: <Settings/>}], '/settings', {preloadedState: authState})});
    await waitFor(() => {expect(screen.getByTestId('mui-avatar')).toBeInTheDocument()});
  });
  test('renders Settings Page with authenticated user', async () => {
    // Check if 'Settings Page' text is present in the document
    expect(screen.getByText('Settings')).toBeInTheDocument();
    });
});
  
describe('PostEdit component', () => {
  beforeEach(async () => {
    act(() => {renderWithProviders([{path: 'post/edit', elem: <PostEdit/>}], '/post/edit', {preloadedState: authState})});
    await waitFor(() => {expect(screen.getByTestId('mui-avatar')).toBeInTheDocument()});
  });
  test('renders PostEdit component', async () => {
    // expect(screen.getByTestId('recipe-image')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument())
    // Add more checks for other elements as needed
  });
}); 