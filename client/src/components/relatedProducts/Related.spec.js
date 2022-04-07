/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app';
import RelatedProductsAndOutfit from './classRelated';
import RelatedProducts from './RelatedProducts';
import Outfit from './Outfit';
import Card from './Card';

// test('renders nav bar on button click', (done) => {
//   render(<App />);
//   fireEvent.click(screen.getByRole('button'));
//   expect(screen.getByText('Search').toExist);
//   done();
// });

// test('passes search bar input on submit', (done) => {
//   const nav = render(<Nav />);
//   const input = nav.getByPlaceholderText('Search...');
//   const testStr = 'this is a test';
//   fireEvent.change(input, { target: { value: testStr } });
//   fireEvent.click(screen.getByRole('button'));

//   expect(screen.getByText('this is a test').toExist);
//   done();
// });
const server = setupServer(
  rest.get('/products/40348/related', (req, res, ctx) => res(ctx.json([40349, 40349, 40351, 40352, 40344, 40346]))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('classRelated will render 2 components', (done) => {
  render(<RelatedProductsAndOutfit id={40348} changeProduct={App} />);
  expect(screen.getByText('Related Products').toExist);
  expect(screen.getByText('Outfit').toExist);
  done();
});
