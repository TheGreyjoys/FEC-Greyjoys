import React from 'react';
import { productTest, productStylesTest } from './testProduct';
import ImageGallery from './ImageGallery';
import {
  // eslint-disable-next-line max-len
  getCurrentProduct, getAllProducts, getProductStyles, getReviews, getReviewsMeta, postReview, markHelpful, markReported,
} from '../../requests';

class ProdDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productStyles: [],
      selectedStyle: productStylesTest.results[0],
    };
  }

  componentDidMount() {
    const { id } = this.props;
    Promise.all([getCurrentProduct(id), getProductStyles(id)])
      .then((results) => {
        const product = results[0].data;
        const productStyles = results[1].data.results;
        console.log(productStyles[0]);
        this.setState({
          product,
          productStyles,
          selectedStyle: productStyles[0],
        });
      });
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
