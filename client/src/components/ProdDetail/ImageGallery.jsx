/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import ImageCarousel from './ImageCarousel';
import ThumbCarousel from './ThumbCarousel';

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

  handleThumbClick(e) {
    this.setState({
      currIndex: Number(e.target.value),
    });
    e.target.className = 'thumb-sel';
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

  imgPuller(photos) {
    const thumbs = [];
    const img = [];
    photos.forEach((photo) => {
      thumbs.push(photo.thumbnail_url);
      img.push(photo.url);
    });
    return [img, thumbs];
  }

  render() {
    const {
      allImgs, allThumbs, currIndex,
    } = this.state;
    const { currProduct, selectedStyle } = this.props;

    return (
      <div className="image-window">
        {allImgs.length
          && (
          <ImageCarousel
            allImgs={allImgs}
            currIndex={currIndex}
            prevImg={this.prevImg}
            nextImg={this.nextImg}
          />
          )}
        {allThumbs.length
          && (
            <ThumbCarousel
              allThumbs={allThumbs}
              currIndex={currIndex}
              currProduct={currProduct}
              currStyle={selectedStyle.style_id}
              handleThumbClick={this.handleThumbClick}
            />
          )}
      </div>
    );
  }
}

// ImageGallery.propTypes = {
//   selectedStyle: PropTypes.shape.isRequired,
// };

export default ImageGallery;
