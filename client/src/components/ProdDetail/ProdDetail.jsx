import React from 'react';
import { product, productStyles } from './testProduct';

class ProdDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      state: '',
    };
  }

  render() {
    return (
      <main>
        <section className="overview">
          <div className="imageGallery">
            ImageGallery.jsx
            <div className="thumbs">Thumbs.jsx</div>
          </div>
          <div className="prodSelect">
            <div className="rating">Rating.jsx</div>
            <span className="prodCategory">Category</span>
            <header>PRODUCT NAME</header>
            <div className="price">Price.jsx</div>
            <form className="styles">
              Styles.jsx
              <div className="selector">Selector.jsx</div>
              <div className="sizeSelect">SIZE</div>
              <div className="qtySelect">QTY</div>
              <button type="submit">ADD TO BAG</button>
            </form>
          </div>
        </section>
        <details className="productDetails">
          PRODUCT DETAILS
        </details>
      </main>
    );
  }
}

export default ProdDetail;
