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

  componentDidMount() {
    console.log('hi');
    getRelatedProducts(this.props.id)
      .then((relatedArray) => relatedArray.data.map(async (productID) => {
        // eslint-disable-next-line max-len
        let product = await Promise.all([getCurrentProduct(productID), getProductStyles(productID), getReviewsMeta(productID)])
          .then(([{ data: { name, category } }, { data: { results } }, { data: { ratings } }]) => {
            product = { name, category, ratings };
            results.forEach((style) => {
              if (style['default?']) {
                product.originalPrice = style.original_price;
                product.salePrice = style.sale_price;
                product.photos = style.photos;
              }
            });
          })
          .catch((err) => console.log(err));
        return product;
      }))
      .then((related) => {
        this.setState({
          relatedProducts: related,
        });
      })
      .catch((err) => console.log(err));
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
