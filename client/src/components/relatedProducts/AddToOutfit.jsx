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
      updateOutfit();
    }
  }

  return (
    <button className="card" type="button" style={{ height: '312.5px', width: '202px', fontFamily: 'Fira sans' }} onClick={handleClick}>
      <div style={{ fontSize: '30px' }}>&#43;</div>
      <br />
      <p>Add This Item to Your Outfit</p>
    </button>
  );
}

AddToOutfit.propTypes = {
  currentProduct: PropTypes.number.isRequired,
  updateOutfit: PropTypes.func.isRequired,
};

export default AddToOutfit;
