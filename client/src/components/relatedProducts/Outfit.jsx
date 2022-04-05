import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function Outfit(props) {
  const { products, changeProduct } = props;

  return (
    <ul>
      {products.map((product) => (
        <Card
          key={product}
          productID={product}
          changeProduct={changeProduct}
        />
      ))}
    </ul>
  );
}
Outfit.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeProduct: PropTypes.func.isRequired,
};

export default Outfit;
