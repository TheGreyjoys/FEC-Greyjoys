/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import regeneratorRuntime from 'regenerator-runtime';
import RelatedProducts from './RelatedProducts';
import Outfit from './Outfit';
import {
  getRelatedProducts, getCurrentProduct, getProductStyles, getReviewsMeta,
} from '../../requests';

class RelatedProductsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: null,
    };
  }

  async componentDidMount() {
    const related = await getRelatedProducts(this.props.id);
    const result = [];
    related.data.forEach(async (prodID) => {
      let product = {};
      const { data: { name, category, id } } = await getCurrentProduct(prodID);
      const { data: { results } } = await getProductStyles(prodID);
      const { data: { ratings } } = await getReviewsMeta(prodID);
      product = { name, category, id, ratings };
      results.forEach((style) => {
        if (style['default?']) {
          product.originalPrice = style.original_price;
          product.salePrice = style.sale_price;
          product.photos = style.photos;
        }
      });
      result.push(product);
    });
    this.setState({
      relatedProducts: result,
    });
  }

  render() {
    if (this.state.relatedProducts) {
      return (
        <div>
          <RelatedProducts products={this.state.relatedProducts} />
          {/* <Outfit products={outfitItems} /> */}
        </div>
      );
    }
    return <div>loading....</div>;
  }
}

export default RelatedProductsAndOutfit;
