/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Comparison(props) {
  const { currentProductData, cardProduct } = props;
  const {
    name: currName = 'hi', category: currCat, ratings: currRating, default_price: currPrice,
  } = currentProductData;
  const {
    id, name: compName = 'hi', category: compCat, ratings: compRating, originalPrice: compOrigPrice, salePrice: compSalePrice,
  } = cardProduct;
  const [showComp, setShowComp] = useState(false);

  function toggleShowComp(e) {
    e.preventDefault();
    setShowComp(!showComp);
  }

  if (!showComp) {
    return <button type="button" onClick={toggleShowComp} className="actionButton">☆</button>;
  }
  return ReactDOM.createPortal(
    <div>
      <div className="modal">
        <table className="comparisonTable">
          <thead>
            <tr>
              <th>{compName}</th>
              <th>Name</th>
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
              <td>{currPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" onClick={toggleShowComp}>Close</button>
    </div>,
    document.getElementById(`${id}`),
  );
}

export default Comparison;
