import React from 'react';
import PropTypes from 'prop-types';

function Stars(props) {
  const { filled, color } = props;
  if (filled === '1') {
    return <div style={{ fontSize: '16px' }} className="star">★</div>;
  }
  if (filled === '2') {
    const halfStar = (
      <div
        className="halfStar star"
        style={{
          backgroundImage: `linear-gradient(to right,
          rgb(85, 85, 85) 0% ${color * 100}%,
          white ${color * 100}% 100%)`,
          WebkitTextFillColor: 'transparent',
          WebkitTextStrokeWidth: '1px',
          WebkitTextStrokeColor: 'rgb(85, 85, 85)',
          fontSize: '13px',
          top: '-1px',
          position: 'relative',
          WebkitBackgroundClip: 'text',
        }}
      >
        ★

      </div>
    );
    return halfStar;
  }
  return <div className="star">☆</div>;
}

Stars.propTypes = {
  filled: PropTypes.string.isRequired,
  color: PropTypes.number,
};

Stars.defaultProps = {
  color: -1,
};

export default Stars;
