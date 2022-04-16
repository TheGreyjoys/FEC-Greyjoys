import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Thumb(props) {
  const {
    thumbUrl, index, currIndex, handleThumbClick,
  } = props;

  const [url, setUrl] = useState(thumbUrl);

  useEffect(() => {
    setUrl(thumbUrl);
  }, [thumbUrl]);

  useEffect(() => {

  }, [currIndex]);

  return (
    <input
      type="image"
      className={index === currIndex ? 'thumb-sel' : 'thumb'}
      src={url}
      alt={`thumb${index}`}
      value={index}
      onClick={handleThumbClick}
    />
  );
}

Thumb.propTypes = {
  currIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  thumbUrl: PropTypes.string.isRequired,
  handleThumbClick: PropTypes.func.isRequired,
};

export default Thumb;
