import React from 'react';

function Stars(props) {
  if (props.filled === '1') {
    return <div className="star">★</div>;
  }
  if (props.filled === '2') {
    return <div className="half star" style={{'color': 'grey'}}>★</div>;
  }
  return <div className="star">☆</div>;
}

export default Stars;
