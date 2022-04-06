import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function RelatedProducts(props) {
  const { products, changeProduct } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length] = useState(products.length);

  const scrollRight = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {
        currentIndex > 0
        && <button type="button" className="leftArrow" onClick={scrollLeft}>&larr;</button>
        }
        <div className="carousel-content-wrapper">
          <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
            {products.map((product) => (
              <Card
                key={product}
                productID={product}
                changeProduct={changeProduct}
              />
            ))}
          </div>
        </div>
        {
        currentIndex < (length - 1)
        && <button type="button" className="rightArrow" onClick={scrollRight}>&rarr;</button>
        }
      </div>
    </div>
  );
}

RelatedProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeProduct: PropTypes.func.isRequired,
};

export default RelatedProducts;
