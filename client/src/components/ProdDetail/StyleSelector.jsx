/* eslint-disable react/prop-types */
import React, { useState } from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currStyle: {},
      styles: [],
      styleSizes: [],
    };
    this.sizeFinder = this.sizeFinder.bind(this);
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.selectedStyle.style_id;
    const oldId = prevProps.selectedStyle.style_id;
    if (newId !== oldId) {
      const { selectedStyle, productStyles, selectedStyle: { skus } } = this.props;
      let sizes = [];
      if (Object.keys(skus).length) {
        sizes = this.sizeFinder(skus);
      }
      this.setState({
        currStyle: selectedStyle,
        styles: productStyles,
        styleSizes: sizes,
      });
    }
  }

  sizeFinder(skus) {
    const availSizes = [];
    Object.entries(skus).forEach((sku) => {
      const { quantity, size } = sku[1];
      if (quantity) {
        availSizes.push([size, quantity]);
      }
    });
    return availSizes;
  }

  render() {
    const { currStyle, styles, styleSizes } = this.state;

    const renderSizes = () => {
      if (styleSizes.length) {
        return (
          <label>
            Size:
            <select className="sizeSelect" name="size">
              {styleSizes.map((option) => <option value={option[0]}>{`${option[0]}   Qty: ${option[1]}`}</option>)}
            </select>
          </label>
        );
      }
      return (
        <label>
          Size:
          <select className="sizeSelect" disabled="true">
            <option>OUT OF STOCK</option>
          </select>
        </label>
      );
    };

    return (
      <form className="styleSelector">
        <div className="selector">
          <h5>{currStyle.name}</h5>
        </div>
        {renderSizes()}
      </form>
    );
  }
}

export default StyleSelector;
