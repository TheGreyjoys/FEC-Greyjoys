import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function RelatedProducts(props) {
  console.log('related props', props);
  const { products } = props;
  const [prodState, setProd] = useState(products);

  useEffect(()=>{
    
  });
  return (
    <div>
      <ul>
        {prodState.map((product) => {
          console.log('product');
          return <Card product={product} key={product.id} />;
        })}
      </ul>
    </div>
  );
}

// RelatedProducts.propTypes = {
//   products: PropTypes.arrayOf.isRequired,
// };

export default RelatedProducts;
