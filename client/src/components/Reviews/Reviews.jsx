/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import Review from './Review';
import WriteReview from './WriteReview';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* need current product id */
      reviews: [],
      product_id: '40344',
      page: 1,
      sort: 'relevant',
      reading: false,
      meta: {},
      rating: 0,
      writing: false,
    };
    this.getReviews = this.getReviews.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.toggleExpandReviews = this.toggleExpandReviews.bind(this);
    this.getMeta = this.getMeta.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.writeReview = this.writeReview.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    this.getMeta();
  }



  getReviews() {
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
        let sum = 0;
        let people = 0;
        for (var key in res.data.ratings) {
          sum += key * res.data.ratings[key];
          people += Number(res.data.ratings[key]);
        }
        const average = people ? Number(sum / people).toFixed(1) : 0;
        this.setState({ meta: res.data, rating: average });
      })
      .catch(console.log);
  }

  changeSort(e) {
    this.setState({ sort: e.target.value, reading: true }, this.getReviews);
  }

  toggleExpandReviews() {
    const { reading } = this.state;
    this.setState({ reading: !reading });
  }

  goToPage(p) {
    this.setState({ page: p }, this.getReviews);
  }

  writeReview() {
    const { writing } = this.state;
    this.setState({ writing: !writing, reading: false });
  }

  submitReview(input) {
    console.log(input);
    const { writeReview } = this.state;
    this.setState({ writing: !writeReview });
  }

  renderReviews() {
    const { reviews, reading, page } = this.state;
    if (reviews.length === 0) {
      if (page > 1) {
        return (
          <div>
            No more reviews!
            <button type="submit" onClick={() => { this.goToPage(1); }}>back to first page</button>
          </div>
        );
      }
      return 'no reviews';
    }
    if (!reading) {
      return (
        <div>
          <Review key={reviews[0].review_id} review={reviews[0]} />
          <Review key={reviews[1].review_id} review={reviews[1]} />
          <button type="submit" onClick={this.toggleExpandReviews}>More Reviews</button>
        </div>

      );
    }
    return (
      <div>
        {reviews.map((review) => <Review key={review.review_id} review={review} />)}
        <button type="submit" onClick={this.toggleExpandReviews}>Collapse</button>
        {page > 1 && <button type="submit" onClick={() => { this.goToPage(page - 1); }}>Previous Page</button>}
        <button type="submit" onClick={() => { this.goToPage(page + 1); }}>Next Page</button>

      </div>
    );
  }

  render() {
    const { reviews, sort, rating, meta, writing } = this.state;
    const { length } = reviews;
    return (
      <div>
        RATINGS & REVIEWS
        <div>
          {rating}
          out of 5,
          {meta.recommend}
          people recommend this product
        </div>

        <div>
          {length}
          reviews, sorted by
          <select value={sort} onChange={this.changeSort}>
            <option value="relevant">most relevant</option>
            <option value="newest">newest</option>
            <option value="helpful">most helpful</option>
          </select>
        </div>
        {!writing && this.renderReviews()}
        {writing ? <WriteReview submit={this.submitReview} /> : <button type="submit" onClick={this.writeReview}>WriteReview</button>}
      </div>
    );
  }
}

export default Reviews;
