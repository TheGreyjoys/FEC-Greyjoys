import axios from 'axios';

const controller = new AbortController();
const { signal } = controller;

// this file does not yet contain requests for Q&A section or Cart API or Interactions API

function getCurrentProduct(id) {
  return axios.get(`/products/${id}`, { signal });
}

function getAllProducts() {
  return axios.get('/products', { signal });
}

function getProductStyles(id) {
  return axios.get(`/products/${id}/styles`, { signal });
}

function getRelatedProducts(id) {
  return axios.get(`/products/${id}/related`, { signal });
}

function getReviews(id, sort, page) {
  return axios.get(`/reviews?product_id=${id}&sort=${sort}&page=${page}`, { signal });
}

function getReviewsMeta(id) {
  return axios.get(`/reviews/meta?product_id=${id}`, { signal });
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
