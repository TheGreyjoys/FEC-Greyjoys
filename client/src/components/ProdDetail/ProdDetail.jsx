import React from 'react';
import { productTest, productStylesTest } from './testProduct';
import ImageGallery from './ImageGallery';

class ProdDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: productTest,
      // productStyles: productStylesTest,
      selectedStyle: productStylesTest.results[0],
    };
  }

  render() {
    const { product } = this.state;
    // const { productStyles } = this.state;
    const { selectedStyle } = this.state;
    return (
      <div>
        <section className="overview">
          <ImageGallery selectedStyle={selectedStyle} />
          <div className="prodSelect">
            <div className="rating">Rating.jsx</div>
            <span className="prodCategory">{product.category}</span>
            <header className="productName">{product.name}</header>
            <div className="price">
              Price.jsx
              {product.default_price}
            </div>
            <form className="styles">
              Styles.jsx
              <div className="selector">Selector.jsx</div>
              <div className="sizeSelect">SIZE</div>
              <div className="qtySelect">QTY</div>
              <button className="cartAdd" type="submit">ADD TO BAG</button>
            </form>
          </div>
        </section>
        <section className="productDetails">
          {product.description}
        </section>
      </div>
    );
  }
}

export default ProdDetail;
