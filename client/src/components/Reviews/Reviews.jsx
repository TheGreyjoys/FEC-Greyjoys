/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import Review from './Review';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* need current product id */
      reviews: [],
      product_id: '',
      page: 0,
      sort: 'relevant',
      reading: false,
    };
    this.getReviews = this.getReviews.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  handleChange(e) {
    this.setState({ sort: e.target.value, reading: true }, this.getReviews);
  }

  getReviews() {
    const { page, sort, product_id } = this.state;
    axios.get(`/reviews/?page=${page}&sort=${sort}&product_id=${product_id}`)
      .then((res) => {
        this.setState({ reviews: res.data.results });
      })
      .catch(console.log);
  }

  renderReviews() {
    const { reviews, reading } = this.state;
    if (reviews.length === 0) {
      return 'no reviews';
    }
    if (reading) {
      return (
        <Review key={reviews[0].review_id} review={reviews[0]} />
      );
    }
    return reviews.map((review) => <Review key={review.review_id} review={review} />);
  }

  render() {
    const { reviews, sort } = this.state;
    return (
      <div>
        RATINGS & REVIEWS
        <div> </div>

        <div>
          {reviews.length}
          reviews, sorted by
          <select value={sort} onChange={this.handleChange}>
            <option value="relevant">most relevant</option>
            <option value="newest">newest</option>
            <option value="helpful">most helpful</option>
          </select>
        </div>
        <div>{this.renderReviews}</div>

      </div>
    );
  }
}

export default Reviews;
