/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const { product } = props;
  const {
    salePrice, originalPrice, photos, category, name, rating,
  } = product;
  return (
    <li className="card">
      <img src={photos[0].thumbnail_url} alt="product thumbnail" />
      <h6>{category}</h6>
      <h5>{name}</h5>
      <h6>{salePrice || originalPrice}</h6>
      <div>{rating}</div>
    </li>
  );
}

// Card.propTypes = {
//   product: PropTypes.arrayOf.isRequired,
//   original_price: PropTypes.string.isRequired,
// };

export default Card;
