import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function RelatedProducts(props) {
  const { products, changeProduct } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(products.length);

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
    <div>
      <ul
        className="carousel"

      >
        <button type="button" className="leftArrow" onClick={scrollLeft}>&#8249;</button>
        <div className="carouselContent" style={{ transform: `translateX(-${currentIndex * 10}%)` }}>
          {products.map((product) => (
            <Card
              key={product}
              productID={product}
              changeProduct={changeProduct}
            />
          ))}
        </div>
        <button type="button" className="rightArrow" onClick={scrollRight}>&#8250;</button>

      </ul>
    </div>
  );
}
RelatedProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeProduct: PropTypes.func.isRequired,
};

export default RelatedProducts;
