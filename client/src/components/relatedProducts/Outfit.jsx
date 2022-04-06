import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function Outfit(props) {
  const { products } = props;
  console.log('outfit props', products);

  return (
    <ul>
      {products.map((product) => <Card key={product} productID={product} />)}
    </ul>
  );
}
Outfit.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Outfit;
