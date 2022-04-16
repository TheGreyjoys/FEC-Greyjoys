import axios from 'axios';
import { cache, checkCache } from './dataCache';

const controller = new AbortController();
const { signal } = controller;

// this file does not yet contain requests for Q&A section

const dataPacker = (rawData) => (
  { data: rawData }
);

const requestPromise = (id, type, url, forced) => (
  new Promise((res) => {
    const data = checkCache(id, type);
    if (!data || forced) {
      axios.get(url, { signal })
        .then((result) => {
          cache(id, type, result.data);
          res(result);
        });
    } else {
      res(dataPacker(data));
    }
  })
);

function getCurrentProduct(id, forced) {
  return requestPromise(id, 'info', `/products/${id}`, forced);
}

function getAllProducts() {
  return axios.get('/products', { signal });
}

function getProductStyles(id, forced) {
  return requestPromise(id, 'styles', `/products/${id}/styles`, forced);
}

function getRelatedProducts(id, forced) {
  return requestPromise(id, 'related', `/products/${id}/related`, forced);
}

function getReviews(id, sort, page, count = 5) {
  return axios.get(`/reviews?product_id=${id}&sort=${sort}&page=${page}&count=${count}`, { signal });
}

function getReviewsMeta(id, forced) {
  return requestPromise(id, 'reviewsMeta', `/reviews/meta?product_id=${id}`, forced);
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
