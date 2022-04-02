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
      <div>
        <section className="overview">
          <div className="imageGallery">
            ImageGallery.jsx
            <div className="thumbs">Thumbs.jsx</div>
          </div>
          <div className="prodSelect">
            <div className="rating">Rating.jsx</div>
            <span className="prodCategory">Category</span>
            <header className="productName">PRODUCT NAME</header>
            <div className="price">Price.jsx</div>
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
          PRODUCT DETAILS
        </section>
      </div>
    );
  }
}

export default ProdDetail;
