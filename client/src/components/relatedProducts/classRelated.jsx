/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import RelatedProducts from './RelatedProducts';
import Outfit from './Outfit';
import { getRelatedProducts } from '../../requests';

class RelatedProductsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: null,
      outfitItems: null,
    };
  }

  componentDidMount() {
    getRelatedProducts(this.props.id)
      .then((res) => {
        this.setState({
          relatedProducts: res.data,
        });
      })
      .catch((err) => console.error(err));
    this.setState({
      outfitItems: Object.keys(sessionStorage).map((item) => Number(item)).filter((item) => typeof item === 'number' && !Number.isNaN(item)),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      getRelatedProducts(this.props.id)
        .then((res) => {
          this.setState({
            relatedProducts: res.data,
          });
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    if (this.state.relatedProducts) {
      return (
        <div>
          <h3>Related Products</h3>
          <RelatedProducts
            products={this.state.relatedProducts.filter((id, i, arr) => arr.indexOf(id) === i)}
            changeProduct={this.props.changeProduct}
          />
          <h3>Outfit</h3>
          <Outfit
            products={this.state.outfitItems}
            changeProduct={this.props.changeProduct}
          />
        </div>
      );
    }
    return (
      <div>
        <div>loading </div>
        <div>Related Products</div>
        <div> Outfit </div>
      </div>
    );
  }
}

RelatedProductsAndOutfit.propTypes = {
  id: PropTypes.number.isRequired,
  changeProduct: PropTypes.func.isRequired,
};

export default RelatedProductsAndOutfit;
