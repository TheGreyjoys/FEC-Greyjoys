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
      product_id: '40344',
      page: 32,
      sort: 'relevant',
      reading: false,
      meta: {},
      rating: 0,
    };
    this.getReviews = this.getReviews.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.moreReviews = this.moreReviews.bind(this);
    this.getMeta = this.getMeta.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    this.getMeta();
  }

  handleChange(e) {
    this.setState({ sort: e.target.value, reading: true }, this.getReviews);
  }

  getReviews() {
    console.log(this.state.sort);
    const { page, sort, product_id } = this.state;
    axios.get(`/reviews/?page=${page}&sort=${sort}&product_id=${product_id}`)
      .then((res) => {
        this.setState({ reviews: res.data.results });
      })
      .catch(console.log);
  }

  getMeta() {
    const { product_id } = this.state;

    axios.get(`/reviews/meta/?product_id=${product_id}`)
      .then((res) => {
        console.log(res.data);
        let sum = 0;
        let people = 0;
        for (var key in res.data.ratings) {
          sum += key * res.data.ratings[key];
          people += Number(res.data.ratings[key]);
        }
        console.log(people);
        const average = people ? Number(sum / people).toFixed(1) : 0;
        this.setState({ meta: res.data, rating: average });
      })
      .catch(console.log);
  }

  moreReviews() {
    this.setState({ reading: true });
  }

  renderReviews() {
    const { reviews, reading } = this.state;
    console.log(reviews);
    if (reviews.length === 0) {
      return 'no reviews';
    }
    if (!reading) {
      return (
        <div>
          <Review key={reviews[0].review_id} review={reviews[0]} />
          <Review key={reviews[1].review_id} review={reviews[1]} />
          <button type="submit" onClick={this.moreReviews}>More Reviews</button>
        </div>

      );
    }
    return reviews.map((review) => <Review key={review.review_id} review={review} />);
  }

  render() {
    const { reviews, sort, rating, meta } = this.state;
    const { length } = reviews;
    return (
      <div>
        RATINGS & REVIEWS
        <div>
          {rating}out of 5,
          {meta.recommend} people recommend this product
        </div>

        <div>
          {length}
          reviews, sorted by
          <select value={sort} onChange={this.handleChange}>
            <option value="relevant">most relevant</option>
            <option value="newest">newest</option>
            <option value="helpful">most helpful</option>
          </select>
        </div>
        {this.renderReviews()}

      </div>
    );
  }
}

export default Reviews;
