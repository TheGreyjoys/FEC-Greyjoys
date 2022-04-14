import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import AddToOutfit from './AddToOutfit';

function Outfit(props) {
  const {
    products, changeProduct, currentProduct, updateOutfit, currentProductData,
  } = props;
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
          <div className="carousel-content" style={{ transform: `translateX(-${(currentIndex * 100) / length}%)` }}>
            <AddToOutfit currentProduct={currentProduct} updateOutfit={updateOutfit} />
            {products.map((product) => (
              <Card
                key={product}
                productID={product}
                changeProduct={changeProduct}
                currentProductData={currentProductData}
                type="outfit"
                updateOutfit={updateOutfit}
              />
            ))}
          </div>
        </div>
        {
        currentIndex < (length - 3)
        && <button type="button" className="rightArrow" onClick={scrollRight}>&rarr;</button>
        }
      </div>
    </div>
  );
}

Outfit.propTypes = {
  products: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeProduct: PropTypes.func.isRequired,
  currentProduct: PropTypes.number.isRequired,
  currentProductData: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  updateOutfit: PropTypes.func.isRequired,
};

export default Outfit;
