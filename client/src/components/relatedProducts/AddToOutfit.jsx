/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import {
  getCurrentProduct, getProductStyles, getReviewsMeta,
} from '../../requests';

function AddToOutfit(props) {
  const { currentProduct, updateOutfit } = props;

  function handleClick(e) {
    e.preventDefault();
    if (sessionStorage[`${currentProduct}`]) {
      // eslint-disable-next-line no-alert
      alert('Item is already in your outfit');
    } else {
      sessionStorage.setItem(`${currentProduct}`, `${currentProduct}`);
      console.log('item added to sessionStorage ', sessionStorage);
      updateOutfit();
    }
  }

  return (
    <button className="card" type="button" onClick={handleClick}>
      &#43;
      <br />
      Add This Item to Your Outfit
    </button>
  );
}

AddToOutfit.propTypes = {
  currentProduct: PropTypes.number.isRequired,
  updateOutfit: PropTypes.func.isRequired,
};

export default AddToOutfit;
