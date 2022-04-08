import React from 'react';
import Thumb from './Thumb';

class ThumbCarousel extends React.Component {
  constructor(props) {
    super(props);

    const { allThumbs, currIndex } = this.props;

    this.state = {
      allThumbs,
      currIndex,
      slide: 0,
      leftButton: false,
      rightButton: false,
    };
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      currProd, currStyle, allThumbs, currIndex,
    } = this.props;
    const oldProd = prevProps.currProd;
    const oldStyle = prevProps.currStyle;
    if (currProd !== oldProd || currStyle !== oldStyle) {
      this.setState({
        allThumbs,
        currIndex,
      });
    }
  }

  // const { currIndex, slide } = this.state;
  // if (allThumbs.length > 7 && (currIndex - slide) > 0) {
  // if (slide < (allThumbs.length - 7)) {

  // }

  // }
  slideLeft() {
    console.log('slide left');
    const { slide } = this.state;

    if (slide > 0) {
      this.setState({ slide: slide - 1 });
    }
  }

  slideRight() {
    console.log('slide right');
    const { slide } = this.state;
    const { allThumbs } = this.props;

    if (slide < (allThumbs.length - 7)) {
      this.setState({ slide: slide + 1 });
    }
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

    return (
      <div className="thumb-carousel">
        {renderLeftArrow()}
        <div className="thumb-window">
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
