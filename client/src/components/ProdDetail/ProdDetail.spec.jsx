/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { productTest, productStylesTest } from './testProduct';
import ProdDetail from './ProdDetail';
import ImageGallery from './ImageGallery';

const server = setupServer(
  rest.get('/products/40344', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(productTest),
  )),

  rest.get('/products/40344/styles', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(productStylesTest),
  )),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render the Product Details component', (done) => {
  const { findByText } = render(<ProdDetail id={40344} />);
  expect(findByText('Add To Cart').toExist);
  done();
});

test('should fetch and render product info from server', (done) => {
  const { findByText, findAllByTestId } = render(<ProdDetail id={40344} />);

  const prodName = findByText('Camo Onsie');
  const styleName = findByText('Forest Green & Black');
  const catName = findByText('Jackets');
  // const styles = findAllByTestId('styleOption').length;

  expect(prodName.toExist);
  expect(styleName.toExist);
  expect(catName.toExist);
  // expect(styles).toEqual(6);
  done();
});
