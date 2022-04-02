/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.expand = this.expand.bind(this);
  }

  expand() {
    const { clicked } = this.state;
    const isClicked = !clicked;
    this.setState({ clicked: isClicked });
  }

  render() {
    const { clicked } = this.state;
    const { review } = this.props;
    const {
      rating, reviewer_name, date, summary, body, recommend, response
    } = review;
    if (clicked === false) {
      return (
        <li>
          {rating}
          stars
          {reviewer_name}
          {date}
          <h5>{summary.slice(0, 60)}</h5>
          <div>{body.slice(0, 250)}</div>
          <button type="submit" onClick={this.expand}>show more</button>
          {recommend && <div>v I recommend this product.</div>}
          {response && (
          <div>
            Response:
            {response}
          </div>
          )}
          <button type="submit">Helpful</button>
          <button type="submit">Report</button>
        </li>
      );
    }
    return (
      <li>
        {rating}
        stars
        {reviewer_name}
        {date}
        <h5>{summary}</h5>
        <div>{body}</div>
        <button type="submit" onClick={this.expand}>show less</button>
        {recommend && <div>v I recommend this product.</div>}
        {response && (
        <div>
          Response:
          {response}
        </div>
        )}
        <button type="submit">Helpful</button>
        <button type="submit">Report</button>
      </li>
    );
  }
}

Review.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  review: PropTypes.object,
};

export default Review;
