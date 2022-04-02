import React, { useState } from 'react';
import RelatedProducts from './RelatedProducts';
import Outfit from './Outfit';

function RelatedProductsAndOutfit(props) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [outfitItems, setOutfitItems] = useState([]);

  return (
    <div>
      <RelatedProducts products={relatedProducts} />
      <Outfit products={outfitItems} />
    </div>
  );
}

export default RelatedProductsAndOutfit;
