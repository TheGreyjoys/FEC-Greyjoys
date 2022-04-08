import React from 'react';

class CImage extends React.Component {
  constructor(props) {
    super(props);

    const { url, index, currIndex } = this.props;

    this.state = {
      url,
      index,
      currIndex,
    };
  }

  componentDidUpdate(prevProps) {
    const newIndex = this.props.currIndex;
    const oldIndex = prevProps.currIndex;
    const newUrl = this.props.url;
    const oldUrl = prevProps.url;
    if (newIndex !== oldIndex || newUrl !== oldUrl) {
      this.setState({
        url: newUrl,
        currIndex: newIndex,
      });
    }
  }


  render() {
    const { url, index, currIndex } = this.state;
    return (
      <div
        className={index === currIndex ? 'image-slide' : 'image-slide-out'}
        style={{
          backgroundImage: `url(${url})`,
        }}
      />
    );
  }
}

export default CImage;
