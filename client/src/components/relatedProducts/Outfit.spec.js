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
import { server, sampleProduct } from '../MockServer';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Outfit will render 2 components', async () => {
  render(<Outfit
    products={[40344]}
    changeProduct={App}
    currentProduct={40344}
    updateOutfit={App}
    currentProductData={sampleProduct}
  />);

  await waitFor(() => screen.getByText('Add This Item to Your Outfit'));
  expect(screen.getByText('Add This Item to Your Outfit').toExist);
});
