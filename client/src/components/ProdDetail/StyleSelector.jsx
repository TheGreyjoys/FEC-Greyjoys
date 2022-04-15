/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Style from './Style';

function StyleSelector(props) {
  const {
    currProduct, selectedStyle, productStyles, handleStyleChange, handleCartAdd,
  } = props;

  const skuRepacker = (skus) => {
    const newSkus = {};
    Object.entries(skus).forEach(([sku, sizeQty]) => {
      const { size, quantity } = sizeQty;
      newSkus[size] = { sku, quantity };
    });
    return newSkus;
  };

  const [currStyle, setCurrStyle] = useState(selectedStyle);
  const [styles, setStyles] = useState(productStyles);
  const [styleSizes, setStyleSizes] = useState(skuRepacker(styles[currStyle].skus));
  const [selSize, setSelSize] = useState('default');
  const [availQty, setAvailQty] = useState(null);
  const [selQty, setSelQty] = useState('default');

  useEffect(() => {
    setCurrStyle(selectedStyle);
    setStyles(productStyles);
    setStyleSizes(skuRepacker(productStyles[selectedStyle].skus));
    setSelSize('default');
    setAvailQty(null);
    setSelQty('default');
  }, [currProduct, productStyles]);

  useEffect(() => {
    setCurrStyle(selectedStyle);
    setStyles(productStyles);
    setStyleSizes(skuRepacker(productStyles[selectedStyle].skus));
    setSelSize('default');
    setAvailQty(null);
    setSelQty('default');
  }, [selectedStyle]);

  const handleStyleClick = (e) => {
    e.preventDefault();
    const clickedStyle = Number(e.target.name);
    if (clickedStyle !== currStyle) {
      handleStyleChange(clickedStyle);
    }
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;

    setSelSize(size);
    setAvailQty(styleSizes[size].quantity);
    setSelQty('default');
  };

  const handleQtyChange = (e) => {
    setSelQty(e.target.value);
  };

  const handleCartSubmit = (e) => {
    e.preventDefault();
    handleCartAdd(styleSizes[selSize].sku, selQty);
  };

  const renderSizes = () => {
    const availSizes = Object.keys(styleSizes);

    if (!availSizes[0] || Object.values(styleSizes).every((size) => !size.quantity)) {
      return (
        <select className="sizeSelect" disabled>
          <option>OUT OF STOCK</option>
        </select>
      );
    }
    return (
      <select
        name="selSize"
        className="sizeSelect"
        value={selSize}
        data-testid="size-select"
        onChange={handleSizeChange}
      >
        <option value="default" disabled hidden>Size</option>
        {availSizes.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  };

  const renderQty = () => {
    if (selSize === 'default') {
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
        data-testid="qty-select"
        onChange={handleQtyChange}
      >
        <option value="default" disabled hidden>Qty</option>
        {qtyArray.map((val, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
      </select>
    );
  };

  const renderCart = () => {
    if (selSize !== 'default' && selQty !== 'default') {
      return (
        <button
          type="submit"
          className="cartAdd"
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
    <form className="styleSelector" onSubmit={handleCartSubmit}>
      <div className="selector">
        <span className="styleName">
          Style &rarr;
          {` ${styles[currStyle].name}`}
        </span>
        <div className="select">
          {Object.values(styles).map((style) => (
            <Style
              key={style.style_id}
              currStyle={currStyle}
              style={style}
              handleStyleClick={handleStyleClick}
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

export default StyleSelector;
