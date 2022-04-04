/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
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

RelatedProductsAndOutfit.propTypes = {
  id: PropTypes.number.isRequired,
};

export default RelatedProductsAndOutfit;
