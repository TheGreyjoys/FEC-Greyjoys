import axios from 'axios';
import { cache, checkCache } from './dataCache';

const controller = new AbortController();
const { signal } = controller;

// this file does not yet contain requests for Q&A section or Cart API or Interactions API

const dataPacker = (rawData) => (
  { data: rawData }
);

function getCurrentProduct(id) {
  return new Promise((res, rej) => {
    const data = checkCache(id, 'info');
    if (!data) {
      axios.get(`/products/${id}`, { signal })
        .then((result) => {
          cache(id, 'info', result.data);
          res(result);
        });
    } else {
      res(dataPacker(data));
    }
  });
}

function getAllProducts() {
  return axios.get('/products', { signal });
}

function getProductStyles(id) {
  return new Promise((res, rej) => {
    const data = checkCache(id, 'styles');
    if (!data) {
      axios.get(`/products/${id}/styles`, { signal })
        .then((result) => {
          cache(id, 'styles', result.data);
          res(result);
        });
    } else {
      res(dataPacker(data));
    }
  });
}

function getRelatedProducts(id) {
  return new Promise((res, rej) => {
    const data = checkCache(id, 'related');
    if (!data) {
      axios.get(`/products/${id}/related`, { signal })
        .then((result) => {
          cache(id, 'related', result.data);
          res(result);
        });
    } else {
      res(dataPacker(data));
    }
  });
}

function getReviews(id, sort, page) {
  return axios.get(`/reviews?product_id=${id}&sort=${sort}&page=${page}`, { signal });
}

function getReviewsMeta(id) {
  return new Promise((res, rej) => {
    const data = checkCache(id, 'reviewsMeta');
    if (!data) {
      axios.get(`/reviews/meta?product_id=${id}`, { signal })
        .then((result) => {
          cache(id, 'reviewsMeta', result.data);
          res(result);
        });
    } else {
      res(dataPacker(data));
    }
  });
}

function postReview(review) {
  // reviews arg. is an object that contains certain properties, see API readme for deets
  return axios.post('/reviews', review);
}

function markHelpful(reviewID) {
  return axios.put(`/reviews/${reviewID}/helpful`);
}

function markReported(reviewID) {
  return axios.put(`/reviews/${reviewID}/report`);
}

function getCart() {
  return axios.get('/cart');
}

function logClick(clickData) {
  return axios.post('/interactions', clickData);
}

// NOT CURRENTLY WORKING
function addCart(sku, qty) {
  const repeatPost = axios.post('/cart', { sku_id: sku });
  const qtyFill = Array(qty).fill(repeatPost);
  return Promise.all(qtyFill);
}

export {
  // eslint-disable-next-line max-len
  getCurrentProduct, getAllProducts, getProductStyles, getRelatedProducts, getReviews, getReviewsMeta, postReview, markHelpful, markReported, getCart, addCart, controller, logClick,
};
