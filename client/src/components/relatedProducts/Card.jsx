/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import {
  getCurrentProduct, getProductStyles, getReviewsMeta,
} from '../../requests';

function Card(props) {
  const { productID } = props;
  const loadingProduct = {
    name: 'loading',
    category: 'loading',
    id: 'loading',
    ratings: {
      1: '1', 2: '2', 3: '18', 4: '8', 5: '4',
    },
    originalPrice: 'loading',
    salePrice: 'loading',
    photos: ['https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60'],
  };

  const [loaded, setLoaded] = useState(false);
  const [product, setProduct] = useState(loadingProduct);

  const {
    name, category, id, ratings, originalPrice, salePrice, photos,
  } = product;

  const updateData = async (prodID) => {
    const { data: { name, category, id } } = await getCurrentProduct(prodID);
    const { data: { results } } = await getProductStyles(prodID);
    const { data: { ratings } } = await getReviewsMeta(prodID);
    const productData = {
      name, category, id, ratings,
    };
    results.forEach((style) => {
      if (style['default?']) {
        productData.originalPrice = style.original_price;
        productData.salePrice = style.sale_price;
        productData.photos = style.photos;
      }
    });
    return productData;
  };
  if (!loaded) {
    updateData(productID)
      .then((productObj) => {
        setLoaded(true);
        setProduct(productObj);
      })
      .catch((err) => { console.log(err); });
  }

  if (loaded) {
    return (
      <div className="cardContainer">
        <li className="card">
          <img src={photos[0].thumbnail_url} alt="product thumbnail" />
          <h6>{category}</h6>
          <h5>{name}</h5>
          <h6>{salePrice || originalPrice}</h6>
          {/* <div>{ratings}</div> */}
        </li>
      </div>
    );
  }
  return (
    <div>loading...</div>
  );
}

Card.propTypes = {
  productID: PropTypes.number.isRequired,
};

export default Card;
