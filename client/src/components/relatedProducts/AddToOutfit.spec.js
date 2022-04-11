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
import AddToOutfit from './AddToOutfit';
import { server, sampleProduct } from '../MockServer';

test('AddToOutfit will display some explanatory text', async () => {
  render(<AddToOutfit
    updateOutfit={App}
    currentProduct={40344}
  />);

  await waitFor(() => screen.getByText('Add This Item to Your Outfit'));
  expect(screen.getByText('Add This Item to Your Outfit').toExist);
});
