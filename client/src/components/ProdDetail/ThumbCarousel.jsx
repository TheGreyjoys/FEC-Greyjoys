import React from 'react';
import Thumb from './Thumb';

function ThumbCarousel(props) {
  const { allThumbs, currIndex, handleThumbClick } = props;

  return (
    <div className="thumb-selector">
      {allThumbs.map((img, index) => (
        <Thumb
          url={allThumbs[index]}
          index={index}
          currIndex={currIndex}
          handleThumbClick={handleThumbClick}
        />
      ))}
    </div>
  );
}

export default ThumbCarousel;
