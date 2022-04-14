const dataCache = {};

/*
goals:
-reduce reduntant api requests
-increase loading performance by reducing reliance on fresh api data for render
-input in chunks based on grouped API calls

initialization:
ProdDetail: currentProduct, productstyles, reviewMeta
RelProd(Card): currentProduct, productStyles, reviewMeta
reviews: reviews, reviewMeta

concept:
-perform core initialization fetch (currentProduct, productStyles, reviewMeta) in app
-components will attempt fetch and reroute to cached data
-all subsequent fetches will cache newly fetched data
-EXTRA: cached data will timeout after x minutes

execution:
-refactor all GET client request handlers to check cache if data exists already (by prodID)

storage schema:

prodId: {
  info: {},
  styles: {};
  reviews: {};
  reviewMeta: {};
}
*/

const cache = (prodId, section, data) => {
  dataCache[prodId][section] = data;
};

const checkCache = (prodId, section) => {
  const cachedData = dataCache[prodId][section];
  if (cachedData) {
    return cachedData;
  }
  return false;
};

// EXTRA: can set cache timeouts based on data section for auto-delete
// const cacheTimeout = (prodId, section) => {

// };

export { cache, checkCache };
