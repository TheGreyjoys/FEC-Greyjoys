/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import regeneratorRuntime from 'regenerator-runtime';
import ProdDetail from './ProdDetail';
import ImageGallery from './ImageGallery';
import { server, sampleProduct, sampleProductStyles } from '../MockServer';

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('image carousel', () => {
  test('renders image from fetched product images', (done) => {
    render(
      <ProdDetail
        id={sampleProduct.id}
      />,
    );

    expect(screen.findByAltText('img0').toExist);

    done();
  });

  test('scroll arrows scroll through product image indices', async () => {
    render(
      <ProdDetail
        id={sampleProduct.id}
      />,
    );
    const rightButton = await screen.findByTestId('i-rarr');

    fireEvent.click(rightButton);

    expect(screen.findByAltText('img1').toExist);
  });

  test('image scrolls past first/last loop back to other end of image array', async () => {
    render(
      <ProdDetail
        id={sampleProduct.id}
      />,
    );
    const rightButton = await screen.findByTestId('i-rarr');
    const leftButton = await screen.findByTestId('i-larr');

    fireEvent.click(leftButton);

    expect(screen.findByAltText('img5').toExist);

    fireEvent.click(rightButton);

    expect(screen.findByAltText('img0').toExist);
  });
});

// describe('thumbnail carousel', () => {
//   test('')
// });
