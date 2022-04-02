import React from 'react';
import axios from 'axios';
import Review from './Review.jsx';

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
    this.setState({ sort: e.target.value, reading: true}, this.getReviews);
  }

  getReviews() {
    axios.get(`/reviews/?page=${this.state.page}&sort=${this.state.sort}&product_id=${this.state.product_id}`)
      .then((res) => {
        this.setState({ reviews: res.data.results });
      })
      .catch(console.log);
  }

  renderReviews() {
    if (this.state.reading) {
      return(
        <
      )
    } else {
      this.state.reviews.map((review) =>
        <Review key={review.review_id} review={review}/>
      )
    }
  }

  render() {
    return (
      <div>
        RATINGS & REVIEWS
        <div> </div>

        <div>
          {this.state.reviews.length} reviews, sorted by
          <select value={this.state.sort} onChange={this.handleChange}>
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