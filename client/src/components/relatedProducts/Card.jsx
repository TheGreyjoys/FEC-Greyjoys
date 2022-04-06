/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import {
  getCurrentProduct, getProductStyles, getReviewsMeta,
} from '../../requests';
import Comparison from './Comparison';

function Card(props) {
  const { productID, changeProduct } = props;
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
    if (!productData.photos) {
      productData.originalPrice = results[0].original_price;
      productData.salePrice = results[0].sale_price;
      productData.photos = results[0].photos;
    }
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

  function handleClick(e) {
    console.log('you clicked: ', (e.target));
    if (!Number.isNaN(Object.values(e.target)[1].value)) {
      changeProduct(Object.values(e.target)[1].value);
    }
  }

  if (loaded) {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li className="card" onKeyPress={handleClick}>
        <button type="button" className="imgLink" value={id} name={name} onClick={handleClick}>
          <img src={photos[0].thumbnail_url} alt="product thumbnail" value={id} />
        </button>
        <h6 className="productDetail">{category}</h6>
        <h5 className="productDetail">{name}</h5>
        <h6 className="productDetail">{salePrice || originalPrice}</h6>
        {/* <div>{ratings}</div> */}
        <Comparison cardProduct={product} />
      </li>
    );
  }
  return (
    <div>loading...</div>
  );
}

Card.propTypes = {
  productID: PropTypes.number.isRequired,
  changeProduct: PropTypes.func.isRequired,
};

export default Card;
