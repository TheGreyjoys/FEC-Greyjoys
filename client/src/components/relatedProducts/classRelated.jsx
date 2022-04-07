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
    this.updateOutfit = this.updateOutfit.bind(this);
  }

  componentDidMount() {
    getRelatedProducts(this.props.id)
      .then((res) => {
        this.setState({
          relatedProducts: res.data,
        });
      })
      .catch((err) => console.error(err));
    this.updateOutfit();
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

  componentWillUnmount() {
    const controller = new AbortController();
    controller.abort();
  }

  updateOutfit() {
    this.setState({
      outfitItems: Object.keys(sessionStorage).map((item) => Number(item)).filter((item) => typeof item === 'number' && !Number.isNaN(item)),
    });
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
            currentProduct={this.props.id}
            updateOutfit={this.updateOutfit}
          />
        </div>
      );
    }
    return (
      <div>
        <div>loading </div>
        <div>Related Productz</div>
        <div> Outfitz </div>
      </div>
    );
  }
}

RelatedProductsAndOutfit.propTypes = {
  id: PropTypes.number.isRequired,
  changeProduct: PropTypes.func.isRequired,
};

export default RelatedProductsAndOutfit;
