/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';

test('renders nav bar on button click', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Search').toExist);
});
