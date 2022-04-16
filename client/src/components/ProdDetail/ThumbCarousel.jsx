import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Thumb from './Thumb';

function ThumbCarousel(props) {
  const {
    allThumbs, currIndex, currProduct, currStyle, handleThumbClick,
  } = props;

  const [slide, setSlide] = useState(0);
  const [leftBound, setLeftBound] = useState(0);
  const [rightBound, setRightBound] = useState(allThumbs.length > 7 ? 6 : allThumbs.length);

  useEffect(() => {
    setSlide(0);
    setLeftBound(0);
    setRightBound(allThumbs.length > 7 ? 6 : allThumbs.length);
  }, [currProduct, currStyle]);

  const autoSlide = () => {
    if (currIndex > rightBound) {
      const rightShift = currIndex - rightBound;
      setSlide(slide + rightShift);
      setLeftBound(leftBound + rightShift);
      setRightBound(rightBound + rightShift);
    }
    if (currIndex < leftBound) {
      const leftShift = currIndex - leftBound;
      setSlide(slide + leftShift);
      setLeftBound(leftBound + leftShift);
      setRightBound(rightBound + leftShift);
    }
    return null;
  };

  useEffect(() => {
    if (currIndex < leftBound || currIndex > rightBound) {
      autoSlide();
    }
  }, [currIndex]);

  const slideLeft = () => {
    if (slide > 0) {
      setSlide(slide - 1);
      setLeftBound(leftBound - 1);
      setRightBound(rightBound - 1);
    }
  };

  const slideRight = () => {
    if (slide < (allThumbs.length - 7)) {
      setSlide(slide + 1);
      setLeftBound(leftBound + 1);
      setRightBound(rightBound + 1);
    }
  };

  const thumbCount = allThumbs.length;
  const thumbGrid = {
    display: 'grid',
    gridTemplateColumns: `repeat(${thumbCount}, 55px)`,
    gridTemplateRows: '55px',
    width: `${thumbCount * 55}px`,
    transform: `translateX(-${(slide * 100) / thumbCount}%)`,
  };

  const needScroll = () => {
    if (thumbCount > 7) {
      return true;
    }
    return false;
  };

  const renderLeftArrow = () => {
    if (needScroll()) {
      if (slide > 0) {
        return (
          <button
            type="button"
            className="left-arrow-thumb"
            onClick={slideLeft}
          >
            &lt;
          </button>
        );
      }
      return (
        <button
          type="button"
          className="left-arrow-thumb-dis"
          disabled
        >
          &lt;
        </button>
      );
    }
    return null;
  };

  const renderRightArrow = () => {
    if (needScroll()) {
      if (slide < (allThumbs.length - 7)) {
        return (
          <button
            type="button"
            className="right-arrow-thumb"
            onClick={slideRight}
          >
            &gt;
          </button>
        );
      }
      return (
        <button
          type="button"
          className="right-arrow-thumb-dis"
          disabled
        >
          &gt;
        </button>
      );
    }
    return null;
  };

  const dynamicWidth = thumbCount > 7 ? 7 * 55 : thumbCount * 55;

  return (
    <div
      className="thumb-carousel"
      style={{ width: `${dynamicWidth + 65}px` }}
    >
      {renderLeftArrow()}
      <div
        className="thumb-window"
        style={{ width: `${dynamicWidth}px` }}
      >
        <div
          className="thumb-selector"
          style={thumbGrid}
        >
          {allThumbs.map((img, index) => (
            <Thumb
              thumbUrl={allThumbs[index]}
              index={index}
              currIndex={currIndex}
              key={allThumbs[index]}
              handleThumbClick={handleThumbClick}
              style={{
                'grid-column': index + 1,
              }}
            />
          ))}
        </div>
      </div>
      {renderRightArrow()}
    </div>
  );
}

ThumbCarousel.propTypes = {
  allThumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
  currIndex: PropTypes.number.isRequired,
  currProduct: PropTypes.number.isRequired,
  currStyle: PropTypes.number.isRequired,
  handleThumbClick: PropTypes.func.isRequired,
};

export default ThumbCarousel;
