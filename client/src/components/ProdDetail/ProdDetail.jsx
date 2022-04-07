/* eslint-disable camelcase */
import React from 'react';
// import { productTest, productStylesTest } from './testProduct';
import PropTypes from 'prop-types';
import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';
import { getCurrentProduct, getProductStyles } from '../../requests';

class ProdDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productStyles: [],
      selectedStyle: {},
    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.handleCartAdd = this.handleCartAdd.bind(this);
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

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (prevProps.id !== id) {
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
    addCart(sky, qty)
      .then()
  }

  render() {
    const { product, productStyles, selectedStyle } = this.state;

    const saleChecker = () => {
      const { sale_price, original_price } = selectedStyle;
      if (!!selectedStyle.sale_price) {
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
              handleCartAdd={this.handleCartAdd}
            />
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
              <span className="productFeature">
                <b>{feature.feature}</b>
                {`:   ${feature.value}`}
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
};

export default ProdDetail;
