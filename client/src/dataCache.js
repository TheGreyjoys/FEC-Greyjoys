const dataCache = {};

const cache = (prodId, section, data) => {
  const prodCache = dataCache[prodId];
  if (!prodCache) {
    dataCache[prodId] = { [section]: {} };
  }
  dataCache[prodId][section] = data;
};

const checkCache = (prodId, section) => {
  const cachedData = dataCache[prodId];
  if (dataCache[prodId]) {
    return cachedData[section];
  }
  return false;
};

// EXTRA: can set cache timeouts based on data section for auto-delete
// const cacheTimeout = (prodId, section) => {

// };

export { dataCache, cache, checkCache };
