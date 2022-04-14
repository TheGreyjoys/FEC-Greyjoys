/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

function Style(props) {
  const {
    style: {
      name, photos, style_id,
    }, handleStyleClick, currStyle,
  } = props;
  return (
    <input
      type="image"
      className={style_id === currStyle ? 'selStyle' : 'style'}
      src={photos[0].thumbnail_url}
      alt={name}
      key={name}
      name={style_id}
      data-testid="style-option"
      onClick={handleStyleClick}
    />
  );
}

Style.propTypes = {
  currStyle: PropTypes.number.isRequired,
  handleStyleClick: PropTypes.func.isRequired,
  style: PropTypes.shape({
    name: PropTypes.string,
    style_id: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
    })),
  }).isRequired,
};

export default Style;
