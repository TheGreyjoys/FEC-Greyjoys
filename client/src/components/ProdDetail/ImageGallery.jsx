import React from 'react';
import PropTypes from 'prop-types';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allImgs: [],
      allThumbs: [],
      currIndex: '',
    };
    this.imgPuller = this.imgPuller.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);
  }

  componentDidMount() {
    const { selectedStyle: { photos } } = this.props;
    const images = this.imgPuller(photos);
    this.setState({
      allImgs: images[0],
      allThumbs: images[1],
      currIndex: 0,
    });
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
    const { allImgs, currIndex } = this.state;
    return (
      // <div className="imageGallery">
      //   <img src={currImg} alt="prodImg" />
      // </div>
      <div className="image-gallery">
        <div className="gallery-wrapper">
          <button
            type="button"
            className="left-arrow"
            onClick={this.prevImg}
          >
            &lt;
          </button>
          <div className="content-wrapper">
            <div
              className="carousel-content"
              style={{ transform: `translateX(-${currIndex * 100}%)` }}
            >
              {allImgs.map((img) => <img src={img} alt="somethingalt" />)}
            </div>
          </div>
          <button
            type="button"
            className="right-arrow"
            onClick={this.nextImg}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  selectedStyle: PropTypes.shape.isRequired,
};

export default ImageGallery;
