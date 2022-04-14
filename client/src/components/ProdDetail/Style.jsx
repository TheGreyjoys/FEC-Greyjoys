/* eslint-disable camelcase */
import React from 'react';

// style_id: {
//   name, original_price, sale_price, photos, skus, style_id
// },

function Style(props) {
  const {
    style: {
      name, original_price, sale_price, photos, skus, style_id,
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

export default Style;
