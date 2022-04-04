/* eslint-disable react/no-unused-state */
import React, { useState, useEffect } from 'react';
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
      relatedProducts: [],
    };
  }

  async componentDidMount() {
    const related = await getRelatedProducts(this.props.id);
    this.setState({
      relatedProducts: await related.data.map(async (prodID) => {
        let product = {};
        const { data: { name, category } } = await getCurrentProduct(prodID);
        const { data: { results } } = await getProductStyles(prodID);
        const { data: { ratings } } = await getReviewsMeta(prodID);
        product = { name, category, ratings };
        results.forEach((style) => {
          if (style['default?']) {
            product.originalPrice = style.original_price;
            product.salePrice = style.sale_price;
            product.photos = style.photos;
          }
        });
        // console.log(product);
        return product;
      }),
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        hi
        {/* <RelatedProducts products={this.state.relatedProducts} /> */}
        {/* <Outfit products={outfitItems} /> */}
      </div>
    );
  }
}

export default RelatedProductsAndOutfit;
