/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

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
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleCartSubmit = this.handleCartSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { selectedStyle, productStyles, selectedStyle: { skus } } = this.props;
    const newId = selectedStyle.style_id;
    const oldId = prevProps.selectedStyle.style_id;
    if (newId !== oldId) {
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

  handleQtyChange(e) {
    this.setState({
      selQty: e.target.value,
    });
  }

  handleCartSubmit(e) {
    e.preventDefault();
    const { selSize, selQty, currStyle: { skus } } = this.state;
    const { handleCartAdd } = this.props;
    Object.entries(skus).forEach((pair) => {
      if (pair[1].size === selSize) {
        handleCartAdd(pair[0], selQty);
      }
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
    const {
      currStyle, styles, styleSizes, selSize, availQty, selQty,
    } = this.state;

    const renderSizes = () => {
      // const sizes = {
      //   XS: 'X-SMALL',
      //   S: 'SMALL',
      //   M: 'MEDIUM',
      //   L: 'LARGE',
      //   XL: 'X-LARGE',
      //   XXL: 'XX-LARGE',
      // };

      if (styleSizes.length) {
        return (
          <select
            name="selSize"
            className="sizeSelect"
            value={selSize}
            onChange={this.handleSizeChange}
          >
            <option disabled>Size</option>
            {styleSizes.map((option) => <option value={option}>{option[0]}</option>)}
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
        <select
          name="selQty"
          className="qtySelect"
          value={selQty}
          onChange={this.handleQtyChange}
        >
          <option disabled>Qty</option>
          {qtyArray.map((val, index) => <option value={index + 1}>{index + 1}</option>)}
        </select>
      );
    };

    const renderCart = () => {
      if (selSize && selQty) {
        return (
          <button
            type="submit"
            className="cartAdd"
            // onClick={this.handleCartClick}
          >
            Add To Cart
          </button>
        );
      }
      return (
        <button
          type="submit"
          className="cartAdd"
          disabled
        >
          Add To Cart
        </button>
      );
    };

    return (
      <form className="styleSelector" onSubmit={this.handleCartSubmit}>
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
        {renderCart()}
      </form>
    );
  }
}

StyleSelector.propTypes = {
  selectedStyle: PropTypes.object.isRequired,
  productStyles: PropTypes.array.isRequired,
  handleStyleChange: PropTypes.func.isRequired,
  handleCartAdd: PropTypes.func.isRequired,
};

export default StyleSelector;
