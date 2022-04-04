import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function RelatedProducts(props) {
  const { products } = props;

  return (
    <div>
      <ul>
        {products.map((product) => <Card key={product} productID={product} />)}
      </ul>
    </div>
  );
}
RelatedProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RelatedProducts;
