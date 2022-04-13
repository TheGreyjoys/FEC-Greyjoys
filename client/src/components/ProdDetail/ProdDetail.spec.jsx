/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import regeneratorRuntime from 'regenerator-runtime';
import { server, sampleProduct, sampleProductStyles } from '../MockServer';
import ProdDetail from './ProdDetail';
import StyleSelector from './StyleSelector';
import ImageGallery from './ImageGallery';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProdDetail initialization', () => {
  test('should render the Product Details component', () => {
    const container = render(<ProdDetail id={sampleProduct.id} />);
    expect(container.getByText('Add To Cart').toExist);
  });

  test('should fetch and render product info from server', async () => {
    const container = render(<ProdDetail id={sampleProduct.id} />);

    expect((await container.findByText('Camo Onesie')).toExist);

    expect((await container.findByText('Jackets')).toExist);

    expect((await container.findAllByTestId('style-option')).length).toEqual(6);
  });

  test('should display appropriate size selections', async () => {
    const container = render(<ProdDetail id={sampleProduct.id} />);
    // const select = await container.findByTestId('size-select');

    expect((await container.findByDisplayValue('XS')).toExist);

    fireEvent.change(await container.findByTestId('size-select'), { target: { value: 'S' } });
    expect((await container.findByDisplayValue('S')).toExist);
    // expect((await container.findByDisplayValue('M')).toExist);
    // expect((await container.findByDisplayValue('L')).toExist);
    // Promise.all([
    //   screen.findByLabelText('X'),
    //   screen.findByLabelText('S'),
    //   screen.findByLabelText('M'),
    //   screen.findByLabelText('L'),
    //   screen.findByLabelText('XL'),
    // ])
    //   .then((results) => {
    //     expect(results[0].toExist);
    //     expect(results[1].toExist);
    //     expect(results[2].toExist);
    //     expect(results[3].toExist);
    //     expect(results[4].toExist);
    //   });

    // done();
  });

//   test('should disable qty selection until size selected', (done) => {
//     screen.findByTestId('qty-select')
//       .then((result) => expect(result.not.toExist))
//       // .then(() => fireEvent.change(screen.findByTestId('size-select'), { target: { value: 'L' } }))
//       .then(() => expect(screen.findByTestId('qty-select').toExist));

//     done();
//   });
});

// describe('ProdDetail style switching', () => {
//   render(<ProdDetail id={sampleProduct.id} />);

//   test('should rerender on style selection', (done) => {
//     screen.findByAltText('Desert Brown & Tan')
//       .then((element) => fireEvent.click(element))
//       .then(() => screen.findByText('Desert Brown & Tan'))
//       .then((element) => expect(element.toExist));
//     done();
//   });
// });

// describe('ProdDetail product switching', (done) => {
//   render(<ProdDetail id={sampleProduct.id} />);

//   test('should rerender on new product selection', (done) => {

//   });
// });