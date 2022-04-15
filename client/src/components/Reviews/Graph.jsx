/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';

function Graph(props) {
  const {
    rating, filterRating, reviewNumber, count,
  } = props;
  return (
    <div className="rating">
      <button
        className="smallReviewButton"
        id={`filter-rating-${rating}`}
        type="submit"
        onClick={() => { filterRating(rating); }}
      >
        {rating}
        {' '}
        stars

      </button>
      <div className="bar">
        <div className="filled" style={{ width: `${Number(count) / reviewNumber * 100}%` }} />
      </div>
      <p>{count}</p>
    </div>
  );
}

Graph.propTypes = {
  rating: PropTypes.number.isRequired,
  filterRating: PropTypes.func.isRequired,
  reviewNumber: PropTypes.number.isRequired,
  count: PropTypes.string.isRequired,
};

export default Graph;
