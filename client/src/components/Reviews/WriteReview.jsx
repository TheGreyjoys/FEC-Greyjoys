import React from 'react';
import PropTypes from 'prop-types';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      rating: 0,
    };
    this.enterPlaceholder = this.enterPlaceholder.bind(this);
    this.clickStar = this.clickStar.bind(this);
    this.showStar = this.showStar.bind(this);
  }

  enterPlaceholder(e) {
    this.setState({ placeholder: e.target.value });
  }

  clickStar(rating) {
    this.setState({ rating });
  }

  showStar(position) {
    return this.state.rating >= position ? '★' : '☆';
  }

  render() {
    const { placeholder } = this.state;
    const { submit } = this.props;
    return (
      <div>
        <h1>Wrhit Your Review</h1>
        <h3>About </h3>
        <div>
          <p>Your Rating:</p>
          <div className="selectable star" onClick={()=>{this.clickStar(1)}}>{this.showStar(1)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(2)}}>{this.showStar(2)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(3)}}>{this.showStar(3)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(4)}}>{this.showStar(4)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(5)}}>{this.showStar(5)}</div>
        </div>
        <label>
          Review Form Placeholder
          <input type="text" value={placeholder} onChange={this.enterPlaceholder} placeholder="just a placeholder input area" />
          <button type="submit" onClick={() => { submit(placeholder); }}>Submit</button>
        </label>
      </div>
    );
  }
}

WriteReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  submit: PropTypes.func,
};

export default WriteReview;
