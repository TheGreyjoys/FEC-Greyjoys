/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allImgs: [],
      allThumbs: [],
      currIndex: 0,

    };
    this.imgPuller = this.imgPuller.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.selectedStyle.style_id;
    const prevId = prevProps.selectedStyle.style_id;
    if (newId !== prevId) {
      const { selectedStyle: { photos } } = this.props;
      const images = this.imgPuller(photos);
      this.setState({
        allImgs: images[0],
        allThumbs: images[1],
        currIndex: 0,
      });
    }
  }

  imgPuller(photos) {
    const thumbs = [];
    const img = [];
    photos.forEach((photo) => {
      thumbs.push(photo.thumbnail_url);
      img.push(photo.url);
    });
    return [img, thumbs];
  }

  nextImg() {
    const { currIndex, allImgs } = this.state;
    if (currIndex < allImgs.length - 1) {
      this.setState({ currIndex: currIndex + 1 });
    } else {
      this.setState({ currIndex: 0 });
    }
  }

  prevImg() {
    const { currIndex, allImgs } = this.state;
    if (currIndex > 0) {
      this.setState({ currIndex: currIndex - 1 });
    } else {
      this.setState({ currIndex: allImgs.length - 1 });
    }
  }

  handleThumbClick(e) {
    console.log(e.target.value)
    this.setState({
      currIndex: e.target.value,
    });
    e.target.className = 'thumb-sel';
  }

  render() {
    const {
      allImgs, allThumbs, currIndex,
    } = this.state;
    console.log('re-render images')

    return (
      <div className="image-window">
        <div className="carousel">
          <button
            type="button"
            className="left-arrow"
            onClick={this.prevImg}
          >
            &larr;
          </button>
          <div
            className="image-slide"
            style={{
              backgroundImage: `url(${allImgs[currIndex]})`,
            }}
          />
          <button
            type="button"
            className="right-arrow"
            onClick={this.nextImg}
          >
            &rarr;
          </button>
        </div>
        <div className="thumb-selector">
          {allImgs.map((img, index) => (
            <input
              type="image"
              className={index === currIndex ? 'thumb-sel' : 'thumb'}
              src={allThumbs[index]}
              alt={`img${index}`}
              value={index}
              onClick={this.handleThumbClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

// ImageGallery.propTypes = {
//   selectedStyle: PropTypes.shape.isRequired,
// };

export default ImageGallery;
