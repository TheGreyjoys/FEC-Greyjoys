import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function Outfit(props) {
  const { products } = props;
  console.log('outfit props', products);

  return (
    <div>
      <ul>
        {products.map((product) => <Card key={product} productID={product} />)}
      </ul>
    </div>
  );
}
Outfit.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Outfit;
