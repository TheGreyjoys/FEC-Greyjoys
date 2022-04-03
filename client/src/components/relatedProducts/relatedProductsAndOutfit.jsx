// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import RelatedProducts from './RelatedProducts';
// // import Outfit from './Outfit';
// import {
//   getRelatedProducts, getCurrentProduct, getProductStyles, getReviewsMeta,
// } from '../../requests';

// function RelatedProductsAndOutfit(props) {
//   const { id } = props;
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   // const [outfitItems, setOutfitItems] = useState([]);

//   useEffect(() => {
//     getRelatedProducts(id)
//       .then((relatedArray) => relatedArray.data.map((productID) => {
//         let product = {};
//         // eslint-disable-next-line max-len
//         Promise.all([getCurrentProduct(productID), getProductStyles(productID), getReviewsMeta(productID)])
//           .then(([{ data: { name, category } }, { data: { results } }, { data: { ratings } }]) => {
//             product = { name, category, ratings };
//             results.forEach((style) => {
//               if (style['default?']) {
//                 product.originalPrice = style.original_price;
//                 product.salePrice = style.sale_price;
//                 product.photos = style.photos;
//               }
//             });
//             return product;
//           })
//           .catch((err) => console.log(err));
//         return product;
//       }))
//       .then((related) => {
//         setRelatedProducts(related);
//       })
//       .catch((err) => console.log(err));
//   });
//   // useEffect(() => {
//   //   getRelatedProducts(currentProductID)
//   //     .then((relatedProductsResults) => {
//   //       console.log('\n\nrelatedProds', relatedProductsResults.data);
//   //       // use id to mske 3 get requests, to styles, product, reviews/meta
//   //       // return an obj w/ category, name, orig price, sale price, rating, photos
//   //       let formattedRelated = (relatedProductsResults.data.map((relatedProductID) => {
//   //         const product = {};
//   //         getCurrentProduct(relatedProductID)
//   //           .then((productResult) => {
//   //             console.log('productResults', productResult.data);
//   //             product.name = productResult.data.name;
//   //             product.category = productResult.data.category;
//   //           })
//   //           .catch((err) => { console.log(err); });
//   //         getProductStyles(relatedProductID)
//   //           .then((stylesResults) => {
//   //             console.log('styles', stylesResults.data);
//   //             stylesResults.data.results.forEach((style) => {
//   //               if (style['default?']) {
//   //                 product.originalPrice = style.original_price;
//   //                 product.salePrice = style.sale_price;
//   //                 product.photos = style.photos;
//   //               }
//   //             });
//   //           })
//   //           .catch((err) => { console.log(err); });
//   //         getReviewsMeta(relatedProductID)
//   //           .then((res) => {
//   //             product.rating = res.data.ratings;
//   //           })
//   //           .catch((err) => console.log(err));
//   //         return product;
//   //       }));
//   //       return formattedRelated;
//   //     })
//   //     .then((formatted) => setRelatedProducts(formatted))
//   //     .catch((err) => console.log(err));
//   // });

//   return (
//     <div>
//       hi
//       {/* <RelatedProducts products={relatedProducts} /> */}
//       {/* <Outfit products={outfitItems} /> */}
//     </div>
//   );
// }

// RelatedProductsAndOutfit.propTypes = {
//   id: PropTypes.number.isRequired,
// };

// export default RelatedProductsAndOutfit;
