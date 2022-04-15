import React from 'react';

function Graph(props) {
  return (
    <div className="rating">
      <button
        className="smallReviewButton"
        id={`filter-rating-${props.rating}`}
        type="submit"
        onClick={() => { props.filterRating(props.rating); }}
      >{props.rating}{' '}stars</button>
      <div className="bar">
        <div className="filled" style={{ width: `${Number(props.count) / props.reviewNumber * 100}%` }} />
      </div>
      <p>{props.count}</p>
    </div>
  );
}

export default Graph;
