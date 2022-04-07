/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import RelatedProducts from './RelatedProducts';
import Outfit from './Outfit';
import { getRelatedProducts, controller } from '../../requests';

class RelatedProductsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: null,
      outfitItems: null,
    };
    this.updateOutfit = this.updateOutfit.bind(this);
    this.sampleData = {
      id: 40349,
      campus: 'hr-rfp',
      name: 'Pumped Up Kicks',
      slogan: 'Faster than a just about anything',
      description: 'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.',
      category: 'Kicks',
      default_price: '89.00',
      created_at: '2021-08-13T14:38:44.509Z',
      updated_at: '2021-08-13T14:38:44.509Z',
      features: [
        {
          feature: 'Sole',
          value: 'Rubber',
        },
        {
          feature: 'Material',
          value: 'FullControlSkin',
        },
        {
          feature: 'Mid-Sole',
          value: 'ControlSupport Arch Bridge',
        },
        {
          feature: 'Stitching',
          value: 'Double Stitch',
        },
      ],
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

  // componentWillUnmount() {
  //   controller.abort();
  // }

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
            currentProductData={this.props.currentProductData}
          />
          <h3>Outfit</h3>
          <Outfit
            products={this.state.outfitItems}
            changeProduct={this.props.changeProduct}
            currentProduct={this.props.id}
            updateOutfit={this.updateOutfit}
            currentProductData={this.props.currentProductData || this.sampleData}
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
  currentProductData: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default RelatedProductsAndOutfit;
