/* eslint-disable react/prop-types */
import React from 'react';
import Thumb from './Thumb';

class ThumbCarousel extends React.Component {
  constructor(props) {
    super(props);

    const { allThumbs, currIndex } = this.props;

    this.state = {

      currIndex,
      slide: 0,
      leftBound: 0,
      rightBound: allThumbs.length > 7 ? 6 : allThumbs.length - 1,
    };
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.autoSlide = this.autoSlide.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { leftBound, rightBound } = this.state;
    const {
      currProd, currStyle, allThumbs, currIndex,
    } = this.props;
    const oldProd = prevProps.currProd;
    const oldStyle = prevProps.currStyle;
    if (currProd !== oldProd || currStyle !== oldStyle) {
      this.setState({
        slide: 0,
        leftBound: 0,
        rightBound: allThumbs.length > 7 ? 6 : allThumbs.length - 1,
      });
    }
    if (currIndex !== this.state.currIndex) {
      if (currIndex < leftBound || rightBound < currIndex) {
        this.autoSlide();
      }
      this.setState({ currIndex });
    }
  }

  slideLeft() {
    const { slide, leftBound, rightBound } = this.state;

    if (slide > 0) {
      this.setState({
        slide: slide - 1,
        leftBound: leftBound - 1,
        rightBound: rightBound - 1,
      });
    }
  }

  slideRight() {
    const { slide, leftBound, rightBound } = this.state;
    const { allThumbs } = this.props;

    if (slide < (allThumbs.length - 7)) {
      this.setState({
        slide: slide + 1,
        leftBound: leftBound + 1,
        rightBound: rightBound + 1,
      });
    }
  }

  autoSlide() {
    const { currIndex } = this.props;
    const { slide, leftBound, rightBound } = this.state;
    if (currIndex > rightBound) {
      const rightShift = currIndex - rightBound;
      this.setState({
        slide: slide + rightShift,
        leftBound: leftBound + rightShift,
        rightBound: rightBound + rightShift,
      });
    }
    if (currIndex < leftBound) {
      const leftShift = currIndex - leftBound;
      this.setState({
        slide: slide + leftShift,
        leftBound: leftBound + leftShift,
        rightBound: rightBound + leftShift,
      });
    }
    return null;
  }

  render() {
    const { slide } = this.state;
    const { allThumbs, currIndex, handleThumbClick } = this.props;

    const thumbCount = allThumbs.length;
    const thumbGrid = {
      display: 'grid',
      gridTemplateColumns: `repeat(${thumbCount}, 55px)`,
      gridTemplateRows: '1fr',
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
              onClick={this.slideLeft}
            >
              &lt;
            </button>
          );
        }
        return (
          <button
            type="button"
            className="left-arrow-thumb-dis"
            onClick={this.slideLeft}
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
              onClick={this.slideRight}
            >
              &gt;
            </button>
          );
        }
        return (
          <button
            type="button"
            className="right-arrow-thumb-dis"
            onClick={this.slideRight}
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
                url={allThumbs[index]}
                index={index}
                currIndex={currIndex}
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
}

export default ThumbCarousel;
