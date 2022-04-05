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
      currIndex: '',
      thumbsShow: 4,
    };
    this.imgPuller = this.imgPuller.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);
  }

  componentDidMount() {
    console.log('ImageGallery Mounted!')
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

  render() {
    const { allImgs, currIndex, thumbsShow } = this.state;
    return (
      <div className="image-gallery">
        <div className="thumb-wrapper">
          <button
            type="button"
            className="up-arrow"
            onClick={() => {}}
          >
            &uarr;
          </button>
          <div className="content-wrapper">
            <div
              className="thumb-carousel-content"
              style={{ transform: `translateX(-${currIndex * (100 / thumbsShow)}%)` }}
            >
              {allImgs.map((img, index) => <img src={img} alt={`img${index}`} />)}
            </div>
          </div>
          <button
            type="button"
            className="down-arrow"
            onClick={() => {}}
          >
            &darr;
          </button>
        </div>
        <div className="gallery-wrapper">
          <button
            type="button"
            className="left-arrow"
            onClick={this.prevImg}
          >
            &larr;
          </button>
          <div className="content-wrapper">
            <div
              className="carousel-content"
              style={{ transform: `translateX(-${currIndex * 100}%)` }}
            >
              {allImgs.map((img, index) => <img src={img} alt={`img${index}`} />)}
            </div>
          </div>
          <button
            type="button"
            className="right-arrow"
            onClick={this.nextImg}
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}

// ImageGallery.propTypes = {
//   selectedStyle: PropTypes.shape.isRequired,
// };

export default ImageGallery;
