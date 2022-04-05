/* eslint-disable react/prop-types */
import React, { useState } from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currStyle: {},
      styles: [],
      styleSizes: [],
      selSize: null,
      availQty: null,
      selQty: null,
    };
    this.sizeFinder = this.sizeFinder.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
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

  handleSizeChange(e) {
    const options = e.target.value.split(',');
    this.setState({
      selSize: options[0],
      availQty: Number(options[1]) < 15 ? Number(options[1]) : 15,
    });
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
    const { currStyle, styles, styleSizes, selSize, availQty } = this.state;

    const renderSizes = () => {
      if (styleSizes.length) {
        return (
          <label className="sizeSelect">
            {'Size: '}
            <select name="selSize" onChange={this.handleSizeChange}>
              {styleSizes.map((option) => <option value={option}>{`${option[0]}`}</option>)}
            </select>
          </label>
        );
      }
      return (
        <label className="sizeSelect">
          {'Size: '}
          <select disabled>
            <option>OUT OF STOCK</option>
          </select>
        </label>
      );
    };

    const renderQty = () => {
      if (!selSize) {
        return (
          <label className="qtySelect">
            {'Qty: '}
            <select disabled>
              <option>-</option>
            </select>
          </label>
        );
      }
      const qtyArray = (new Array(availQty)).fill(0);
      return (
        <label className="qtySelect">
          {'Qty: '}
          <select name="selQty">
            {qtyArray.map((val, index) => <option value={index + 1}>{index + 1}</option>)}
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
        {renderQty()}
        <button type="submit" className="cartAdd">Add To Cart</button>
      </form>
    );
  }
}

export default StyleSelector;
