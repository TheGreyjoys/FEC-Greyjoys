/* eslint-disable camelcase */
import React from 'react';
// import { productTest, productStylesTest } from './testProduct';
import PropTypes from 'prop-types';
import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';
import starRating from '../../starRating';
import {
  getCurrentProduct, getProductStyles, addCart, getReviewsMeta,
} from '../../requests';

class ProdDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      product: {},
      prodRating: 0,
      ratingCount: 0,
      productStyles: [],
      selectedStyle: {},
    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.handleCartAdd = this.handleCartAdd.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    Promise.all([getCurrentProduct(id), getProductStyles(id), getReviewsMeta(id)])
      .then((results) => {
        const product = results[0].data;
        const productStyles = results[1].data.results;
        let defaultStyle;
        productStyles.forEach((style) => {
          if (style['default?']) {
            defaultStyle = style;
          }
        });
        const prodRating = this.calcRating(results[2].data.ratings);
        this.setState({
          loaded: true,
          product,
          prodRating: prodRating[0],
          ratingCount: prodRating[1],
          productStyles,
          selectedStyle: defaultStyle,
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (prevProps.id !== id) {
      Promise.all([getCurrentProduct(id), getProductStyles(id), getReviewsMeta(id)])
        .then((results) => {
          const product = results[0].data;
          const productStyles = results[1].data.results;
          let defaultStyle;
          productStyles.forEach((style) => {
            if (style['default?']) {
              defaultStyle = style;
            }
          });
          if (!defaultStyle) {
            defaultStyle = productStyles[0];
          }
          const prodRating = this.calcRating(results[2].data.ratings);
          this.setState({
            product,
            prodRating: prodRating[0],
            ratingCount: prodRating[1],
            productStyles,
            selectedStyle: defaultStyle,
          });
        });
    }
  }

  handleStyleChange(styleId) {
    const { selectedStyle, productStyles } = this.state;
    if (styleId !== selectedStyle.style_id) {
      productStyles.forEach((style) => {
        if (styleId === style.style_id) {
          this.setState({ selectedStyle: style });
        }
      });
    }
  }

  handleCartAdd(sku, qty) {
    // eslint-disable-next-line no-alert
    addCart(sku, qty)
      .then(() => console.log('YAY CART ADDED'))
      .catch((err) => console.log(err));
  }

  calcRating(ratings) {
    let subtotal = 0;
    let count = 0;
    Object.entries(ratings).forEach((rating) => {
      const counter = Number(rating[1]);
      const value = Number(rating[0]);
      subtotal += (counter * value);
      count += counter;
    });
    return [(subtotal / count).toFixed(2), count];
  }

  render() {
    const {
      loaded, product, prodRating, ratingCount, productStyles, selectedStyle, product: { id },
    } = this.state;
    const { handleReviewScroll } = this.props;

    const saleChecker = () => {
      const { sale_price, original_price } = selectedStyle;
      if (selectedStyle.sale_price) {
        return (
          <span style={{ color: 'red' }}>
            <s style={{ color: 'black' }}>{`$${original_price}`}</s>
            {`  $${sale_price}`}
          </span>
        );
      }
      return <span>{`$${original_price}`}</span>;
    };

    return (
      <div>
        <section className="overview">
          {selectedStyle.photos
            && (
            <ImageGallery
              selectedStyle={selectedStyle}
              currProduct={id}
            />
            )}
          <div className="prodSelect">
            <div className="rating">
              <div className="prod-stars">
                {starRating(prodRating)}
              </div>
              <span>{`(${prodRating})`}</span>
              <span
                className="reviews-link"
                onClick={handleReviewScroll}
              >
                {`See all (${ratingCount}) ratings`}
              </span>
            </div>
            <span className="prodCategory">{product.category}</span>
            <span className="productName">{product.name}</span>
            <div className="price">
              {saleChecker()}
            </div>
            {loaded
              && (
              <StyleSelector
                currProduct={id}
                selectedStyle={selectedStyle}
                productStyles={productStyles}
                handleStyleChange={this.handleStyleChange}
                handleCartAdd={this.handleCartAdd}
              />
              )}
          </div>
        </section>
        <section className="productDetails">
          <span className="productDescription">
            {product.description}
          </span>
          <div className="vl" />
          <div className="productFeatures">
            {!!productStyles.length
            && product.features.map((feature) => (
              <span
                className="productFeature"
                key={feature.feature}
              >
                <b>{feature.feature}</b>
                {`:     ${feature.value}`}
              </span>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

ProdDetail.propTypes = {
  id: PropTypes.number.isRequired,
  handleReviewScroll: PropTypes.func.isRequired,
};

export default ProdDetail;
