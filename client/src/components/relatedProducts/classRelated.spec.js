/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

import React from 'react';
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
import { server } from '../MockServer';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('classRelated will render 2 components', async () => {
  render(<RelatedProductsAndOutfit id={40344} changeProduct={App} />);

  await waitFor(() => screen.getByText('Related Products'));
  expect(screen.getByText('Related Products').toExist);
  // expect(screen.getByText('Outfit').toExist);
});
