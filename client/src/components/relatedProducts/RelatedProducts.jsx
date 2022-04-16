import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function RelatedProducts(props) {
  const { products, changeProduct, currentProductData } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(products.length);

  useEffect(() => {
    setLength(products.length);
    setCurrentIndex(0);
  }, [products]);

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
          <div className="carousel-content" style={{ transform: `translateX(-${(currentIndex * 20.5)}%)` }}>
            {products.map((product) => (
              <Card
                key={product}
                productID={product}
                changeProduct={changeProduct}
                currentProductData={currentProductData}
                type="related"
              />
            ))}
          </div>
        </div>
        {
        currentIndex < (length - 5)
        && <button type="button" className="rightArrow" onClick={scrollRight}>&rarr;</button>
        }
      </div>
    </div>
  );
}

RelatedProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeProduct: PropTypes.func.isRequired,
  currentProductData: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default RelatedProducts;
