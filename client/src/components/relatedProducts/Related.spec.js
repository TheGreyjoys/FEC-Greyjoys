/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import regeneratorRuntime from 'regenerator-runtime';
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
  rest.get('/products/40348/related', (req, res, ctx) => res(ctx.json([40349]))),
  rest.get('/products/40349', (req, res, ctx) => res(ctx.json({
    id: 40349,
    campus: 'hr-rfp',
    name: 'Pumped Up Kicks',
    slogan: 'Faster than a just about anything',
    description: 'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.',
    category: 'Kicks',
    default_price: '89.00',
    created_at: '2021-08-13T14:38:44.509Z',
    updated_at: '2021-08-13T14:38:44.509Z',
    features: [
      {
        feature: 'Sole',
        value: 'Rubber',
      },
      {
        feature: 'Material',
        value: 'FullControlSkin',
      },
      {
        feature: 'Mid-Sole',
        value: 'ControlSupport Arch Bridge',
      },
      {
        feature: 'Stitching',
        value: 'Double Stitch',
      },
    ],
  }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('classRelated will render 2 components', async () => {
  render(<RelatedProductsAndOutfit id={40348} changeProduct={App} />);

  await waitFor(() => screen.getByText('Related Products'));
  expect(screen.getByText('Related Products').toExist);
  // expect(screen.getByText('Outfit').toExist);
});
