import React from 'react';

class Thumb extends React.Component {
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
    const { handleThumbClick } = this.props;
    return (
      <input
        type="image"
        className={index === currIndex ? 'thumb-sel' : 'thumb'}
        src={url}
        alt={`img${index}`}
        value={index}
        onClick={handleThumbClick}
      />
    );
  }
}

export default Thumb;
