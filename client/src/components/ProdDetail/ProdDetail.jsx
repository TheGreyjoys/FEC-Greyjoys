/* eslint-disable camelcase */
import React from 'react';
import { productTest, productStylesTest } from './testProduct';
import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';
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
      selectedStyle: {},
    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    Promise.all([getCurrentProduct(id), getProductStyles(id)])
      .then((results) => {
        const product = results[0].data;
        const productStyles = results[1].data.results;
        let defaultStyle;
        productStyles.forEach((style) => {
          if (style['default?']) {
            defaultStyle = style;
          }
        });
        this.setState({
          product,
          productStyles,
          selectedStyle: defaultStyle,
        });
      });
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

  render() {
    const { product, productStyles, selectedStyle } = this.state;

    const saleChecker = () => {
      const { sale_price, original_price } = selectedStyle;
      if (selectedStyle.sale_price) {
        return (
          <span style={{ color: 'red' }}>
            <s style={{ color: 'black' }}>{original_price}</s>
            {`  $${sale_price}`}
          </span>
        );
      }
      return <span>{`$${original_price}`}</span>;
    };

    return (
      <div>
        <section className="overview">
          <ImageGallery selectedStyle={selectedStyle} />
          <div className="prodSelect">
            <div className="rating">Rating.jsx</div>
            <span className="prodCategory">{product.category}</span>
            <span className="productName">{product.name}</span>
            <div className="price">
              {saleChecker()}
            </div>
            <StyleSelector
              selectedStyle={selectedStyle}
              productStyles={productStyles}
              handleStyleChange={this.handleStyleChange}
            />
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
