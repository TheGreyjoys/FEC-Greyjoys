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
    <div className="carouselWrapper">
      {
        currentIndex > 0
        && <button type="button" className="leftArrow" onClick={scrollLeft}>&#8249;</button>
      }
      <ul
        className="carousel"
      >
        <div className="carouselContent" style={{ transform: `translateX(-${currentIndex * 10}%)` }}>
          {products.map((product) => (
            <Card
              key={product}
              productID={product}
              changeProduct={changeProduct}
            />
          ))}
        </div>

      </ul>
      {
        currentIndex < (length - 1)
        && <button type="button" className="rightArrow" onClick={scrollRight}>&#8250;</button>
      }
    </div>
  );
}
RelatedProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeProduct: PropTypes.func.isRequired,
};

export default RelatedProducts;
