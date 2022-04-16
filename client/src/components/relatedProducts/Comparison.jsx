/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Comparison(props) {
  const { currentProductData, cardProduct } = props;
  const {
    name: currName = 'hi', features: currFeatures,
  } = currentProductData;
  const {
    id, name: compName = 'hi', features: compFeatures,
  } = cardProduct;

  const [showComp, setShowComp] = useState(false);
  const [hover, setHover] = useState(false);

  function toggleShowComp(e) {
    e.preventDefault();
    setShowComp(!showComp);
    setHover(false);
  }

  function makeListOfFeatures(currFeat, compFeat) {
    const allFeatures = [];
    currFeat.forEach((obj) => {
      allFeatures.push(obj.feature);
    });
    compFeat.forEach((obj) => {
      if (allFeatures.indexOf(obj.feature) === -1) {
        allFeatures.push(obj.feature);
      }
    });
    return allFeatures;
  }

  function populateTD(feature, list) {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].feature === feature) {
        return (<td>{list[i].value}</td>);
      }
    }
    return (<td>  </td>);
  }

  function populateRows(featuresList) {
    return featuresList.map((feature) => (
      <tr key={feature}>
        {populateTD(feature, compFeatures)}
        <td>{feature}</td>
        {populateTD(feature, currFeatures)}
      </tr>
    ));
  }

  if (!showComp) {
    return <button type="button" onClick={toggleShowComp} className="actionButton" onMouseOver={() => { setHover(true); }} onMouseOut={() => { setHover(false); }}>{hover ? '★' : '☆'}</button>;
  }
  return ReactDOM.createPortal(
    <div>
      <div className="modal">
        <button type="button" className="closeModal" onClick={toggleShowComp} style={{ float: 'right' }}>x</button>
        <br />
        <table className="comparisonTable">
          <thead>
            <tr>
              <th>{compName}</th>
              <th>category</th>
              <th>{currName}</th>
            </tr>
          </thead>
          <tbody>
            {populateRows(makeListOfFeatures(currFeatures, compFeatures))}
          </tbody>
        </table>
      </div>
    </div>,
    document.getElementById(`${id}`),
  );
}

export default Comparison;
