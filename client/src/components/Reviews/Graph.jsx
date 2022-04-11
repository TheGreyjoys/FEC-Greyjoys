import React from 'react';

function Graph (props) {
  return (
    <div className="rating_graph">
      <div className="rating">
        <p>5 stars</p>
        <div className="bar">
          <div className="filled" style={{ width: `${Number(props.five) / props.reviewNumber * 100}%` }}></div>
        </div>
        <p>{props.five}</p>
      </div>
      <div className="rating">
        <p>4 stars</p>
        <div className="bar">
          <div className="filled" style={{ width: `${Number(props.four) / props.reviewNumber * 100}%`  }}></div>
        </div>
        <p>{props.four}</p>
      </div>
      <div className="rating">
        <p>3 stars</p>
        <div className="bar">
          <div className="filled" style={{ width: `${Number(props.three) / props.reviewNumber * 100}%` }}></div>
        </div>
        <p>{props.three}</p>
      </div>
      <div className="rating">
        <p>2 stars</p>
        <div className="bar">
          <div className="filled" style={{ width: `${Number(props.two) / props.reviewNumber * 100}%` }}></div>
        </div>
        <p>{props.two}</p>
      </div>
      <div className="rating">
        <p>1 stars</p>
        <div className="bar">
          <div className="filled" style={{ width: `${Number(props.one) / props.reviewNumber * 100}%` }}></div>
        </div>
        <p>{props.one}</p>
      </div>
    </div>
  );
}

export default Graph;
