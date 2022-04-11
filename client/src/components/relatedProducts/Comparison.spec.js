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
import Comparison from './Comparison';
import { server, sampleProduct } from '../MockServer';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Action button is a cute little star', async () => {
  render(<Comparison
    cardProduct={sampleProduct}
    currentProductData={sampleProduct}
  />);

  await waitFor(() => screen.getByText('☆'));
  expect(screen.getByText('☆').toExist);
});
