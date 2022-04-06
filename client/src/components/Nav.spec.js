/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';
import Nav from './Nav';

// test('renders nav bar on button click', (done) => {
//   render(<App />);
//   fireEvent.click(screen.getByRole('button'));
//   expect(screen.getByText('Search').toExist);
//   done();
// });

test('passes search bar input on submit', (done) => {
  const nav = render(<Nav />);
  const input = nav.getByPlaceholderText('Search...');
  const testStr = 'this is a test';
  fireEvent.change(input, { target: { value: testStr } });
  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByText('this is a test').toExist);
  done();
});
