import React from 'react';
import PropTypes from 'prop-types';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      rating: 0,
      recommend: 'false',
    };
    this.enterPlaceholder = this.enterPlaceholder.bind(this);
    this.clickStar = this.clickStar.bind(this);
    this.showStar = this.showStar.bind(this);
    this.explainStar = this.explainStar.bind(this);
    this.selectRecommend = this.selectRecommend.bind(this);
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

  explainStar() {
    const { rating } = this.state;
    if (rating === 1) {
      return '1 star - “Poor”';
    // eslint-disable-next-line no-else-return
    } else if (rating === 2) {
      return '2 stars - “Fair”';
    } else if (rating === 3) {
      return '3 stars - “Average”';
    } else if (rating === 4) {
      return '4 stars - “Good”';
    } else if (rating === 5) {
      return '5 stars - “Great”';
    }
  }

  selectRecommend(e) {
    this.setState({recommend: e.target.value});
  }

  render() {
    const { placeholder } = this.state;
    const { submit } = this.props;
    return (
      <div>
        <h1>Write Your Review</h1>
        <h3>About /* need product name */</h3>
        <li>
          <p>Your Overall Rating (required):</p>
          <div className="selectable star" onClick={()=>{this.clickStar(1)}}>{this.showStar(1)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(2)}}>{this.showStar(2)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(3)}}>{this.showStar(3)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(4)}}>{this.showStar(4)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(5)}}>{this.showStar(5)}</div>
          <p style={{ 'display': 'inline-block'}}>{this.explainStar()}</p>
        </li>
        <li>
          <p>Do you recommend this product (required)? </p>
          <input type="radio" name="recommend" value="true" id="yes" onChange={this.selectRecommend}></input>
          <label htmlFor="yes">Yes</label>

          <input type="radio" name="recommend" value="false" id="no" onChange={this.selectRecommend}></input>
          <label htmlFor="no">No</label>
        </li>

        <li>
          <p>Characteristics</p>

        </li>

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
