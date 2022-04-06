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
    this.handleStyleClick = this.handleStyleClick.bind(this);
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

  handleStyleClick(e) {
    e.preventDefault();
    const { handleStyleChange } = this.props;

    handleStyleChange(Number(e.target.name));
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
      const sizes = {
        XS: 'X-SMALL',
        S: 'SMALL',
        M: 'MEDIUM',
        L: 'LARGE',
        XL: 'X-LARGE',
        XXL: 'XX-LARGE',
      };

      if (styleSizes.length) {
        return (
          <select name="selSize" className="sizeSelect" onChange={this.handleSizeChange}>
            <option disabled>Size</option>
            {styleSizes.map((option) => <option value={option}>{sizes[option[0]]}</option>)}
          </select>
        );
      }
      return (
        <select className="sizeSelect" disabled>
          <option>OUT OF STOCK</option>
        </select>
      );
    };

    const renderQty = () => {
      if (!selSize) {
        return (
          <select className="qtySelect" disabled>
            <option>-</option>
          </select>
        );
      }
      const qtyArray = (new Array(availQty)).fill(0);
      return (
        <select name="selQty" className="qtySelect">
          <option disabled>Qty</option>
          {qtyArray.map((val, index) => <option value={index + 1}>{index + 1}</option>)}
        </select>
      );
    };

    return (
      <form className="styleSelector">
        <div className="selector">
          <span className="styleName">
            Style &rarr;
            {` ${currStyle.name}`}
          </span>
          <div className="select">
            {styles.map((style) => (
              <input
                type="image"
                className={style.style_id === currStyle.style_id ? 'selStyle' : 'style'}
                src={style.photos[0].thumbnail_url}
                alt={style.name}
                name={style.style_id}
                data-testid="styleOption"
                onClick={this.handleStyleClick}
              />
            ))}
          </div>
        </div>
        <div className="size-qty">
          {renderSizes()}
          {renderQty()}
        </div>
        <button type="submit" className="cartAdd">Add To Cart</button>
      </form>
    );
  }
}

export default StyleSelector;
