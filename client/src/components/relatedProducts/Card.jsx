/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import {
  getCurrentProduct, getProductStyles, getReviewsMeta, controller,
} from '../../requests';
import starRating from '../../starRating';
import Comparison from './Comparison';

function Card(props) {
  const {
    productID, changeProduct, currentProductData, type, updateOutfit,
  } = props;
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
    try {
      const { data: { name, category, id } } = await (getCurrentProduct(prodID));
      const { data: { results } } = await (getProductStyles(prodID));
      const { data: { ratings } } = await (getReviewsMeta(prodID));
      const productData = {
        name, category, id, ratings,
      };
      if (results) {
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
      }
      return productData;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!loaded) {
      updateData(productID)
        .then((productObj) => {
          setProduct(productObj);
          setLoaded(true);
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  function handleClick(e) {
    console.log('you clicked: ', (e.target));
    if (!Number.isNaN(Object.values(e.target)[1].value)) {
      changeProduct(Object.values(e.target)[1].value);
    }
  }

  function removeFromOutfit(e) {
    sessionStorage.removeItem(`${productID}`);
    updateOutfit();
  }

  function parseRating(starObject) {
    const entries = Object.entries(starObject);
    let sum = 0;
    let total = 0;
    entries.forEach((arr) => {
      sum += (Number(arr[0]) * Number(arr[1]));
      total += Number(arr[1]);
    });
    return sum / total;
  }

  function saleChecker(original, sale) {
    if (sale) {
      return (
        <span style={{ color: 'red' }}>
          <s style={{ color: 'black' }}>{original}</s>
          {`  $${sale}`}
        </span>
      );
    }
    return <span>{`$${original}`}</span>;
  }

  if (loaded) {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <div className="card">
        <li>
          <button type="button" className="imgLink" value={id} name={name} onClick={handleClick}>
            <img src={photos[0].thumbnail_url || 'https://source.unsplash.com/mher7uNJZwU'} alt="product thumbnail" value={id} className="cardImg" />
          </button>
          <h5 className="productDetail">{category}</h5>
          <h4 className="productDetail">{name}</h4>
          <h5 className="productDetail">{saleChecker(originalPrice, salePrice)}</h5>
          <div className="productDetail">{ratings && starRating((parseRating(ratings)))}</div>
          <div id={id} />
          {type === 'related' && <Comparison cardProduct={product} currentProductData={currentProductData} />}
          {type === 'outfit' && <button type="button" onClick={removeFromOutfit} className="actionButton" style={{ color: 'lightgrey' }}>&#88;</button>}
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
  changeProduct: PropTypes.func.isRequired,
  currentProductData: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Card;
