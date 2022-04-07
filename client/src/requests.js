import axios from 'axios';

// this file does not yet contain requests for Q&A section or Cart API or Interactions API

function getCurrentProduct(id) {
  return axios.get(`/products/${id}`);
}

function getAllProducts() {
  return axios.get('/products');
}

function getProductStyles(id) {
  return axios.get(`/products/${id}/styles`);
}

function getReviews(id, sort = 'relevant', page = 1) {
  console.log(sort);
  return axios.get(`/reviews?product_id=${id}&sort=${sort}&page=${page}`);
}

function getRelatedProducts(id) {
  return axios.get(`/products/${id}/related`);
}

function getReviewsMeta(id) {
  return axios.get(`/reviews/meta?product_id=${id}`);
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

// NOT CURRENTLY WORKING
// function addCart(sku) {
//   return axios.post('/cart', { sku_id: sku });
// }

export {
  // eslint-disable-next-line max-len
  getCurrentProduct, getAllProducts, getProductStyles, getRelatedProducts, getReviews, getReviewsMeta, postReview, markHelpful, markReported, getCart,
};
