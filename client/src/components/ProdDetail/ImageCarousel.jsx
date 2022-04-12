import React from 'react';
import CImage from './CImage';

function ImageCarousel(props) {
  const {
    allImgs, currIndex, prevImg, nextImg,
  } = props;

  return (
    <div className="carousel">
      <button
        type="button"
        className="left-arrow"
        onClick={prevImg}
        data-testid="i-larr"
      >
        &larr;
      </button>
      {allImgs.map((url, index) => (
        <CImage
          url={url}
          index={index}
          currIndex={currIndex}
          key={url}
        />
      ))}
      <button
        type="button"
        className="right-arrow"
        onClick={nextImg}
        data-testid="i-rarr"
      >
        &rarr;
      </button>
    </div>
  );
}

export default ImageCarousel;
