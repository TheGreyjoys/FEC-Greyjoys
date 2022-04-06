/* eslint-disable max-len */
import React, { useState } from 'react';

function Comparison(props) {
  const { currentProductData, cardProduct } = props;
  const {
    name: currName = 'hi', category: currCat, ratings: currRating, originalPrice: currOrigPrice, salePrice: currSalePrice,
  } = currentProductData;
  const {
    name: compName = 'hi', category: compCat, ratings: compRating, originalPrice: compOrigPrice, salePrice: compSalePrice,
  } = cardProduct;
  const [showComp, setShowComp] = useState(false);

  function toggleShowComp(e) {
    e.preventDefault();
    setShowComp(!showComp);
  }

  if (!showComp) {
    return <button type="button" onClick={toggleShowComp}>Compare</button>;
  }
  return (
    <div>
      wsuuuup
      <div className="modal">
        <table>
          <thead>
            <tr>
              <th>{compName}</th>
              <th>Characteristic</th>
              <th>{currName}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{compCat}</td>
              <td>Category</td>
              <td>{currCat}</td>
            </tr>
            <tr>
              {/* <td>{compRating}</td>
              <td>Rating</td>
              <td>{currRating}</td> */}
            </tr>
            <tr>
              <td>{compSalePrice || compOrigPrice}</td>
              <td>Price</td>
              <td>{currSalePrice || currOrigPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" onClick={toggleShowComp}>Close</button>
    </div>
  );
}

export default Comparison;
