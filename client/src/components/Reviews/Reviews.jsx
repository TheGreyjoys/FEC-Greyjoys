/* eslint-disable camelcase */
import React from 'react';
import Review from './Review';
import WriteReview from './WriteReview';
import Graph from './Graph';
import Stars from './Stars';
import { getReviews, getReviewsMeta } from '../../requests';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* need current product id */
      /* need current product name */
      reviews: null,
      product_id: this.props.id || '40351',
      page: 1,
      sort: 'relevant',
      reading: false,
      meta: null,
      rating: 0,
      reviewNumber: 0,
      recommended: 0,
      overallRatings: null,
      reviewed: false,
    };
    this.getPageReview = this.getPageReview.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.toggleExpandReviews = this.toggleExpandReviews.bind(this);
    this.getMeta = this.getMeta.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.writeReview = this.writeReview.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.starRating = this.starRating.bind(this);
  }

  componentDidMount() {
    this.getMeta();
    this.getPageReview();
  }

  componentDidUpdate() {
     if(this.state.product_id !== this.props.id) {
      this.setState({product_id: this.props.id}, () => { this.getMeta(); this.getPageReview(); });
    }
  }

  getPageReview() {
    const { page, sort, product_id } = this.state;
    getReviews(product_id, sort, page)
      .then((res) => {
        this.setState({ reviews: res.data.results });
      })
      .catch(console.log);
  }

  getMeta() {
    const { product_id } = this.state;

    getReviewsMeta(product_id)
      .then((res) => {
        let sum = 0;
        let people = 0;
        for (var key in res.data.ratings) {
          sum += key * res.data.ratings[key];
          people += Number(res.data.ratings[key]);
        }
        const average = people ? Number(sum / people).toFixed(1) : 0;
        this.setState({
          meta: res.data,
          reviewNumber: people,
          rating: average,
          overallRatings: res.data.ratings,
          recommended: (
            100 * res.data.recommended.true
            / (Number(res.data.recommended.false)
            + Number(res.data.recommended.true))
          ).toFixed(1),
        });
      })
      .catch(console.log);
  }

  starRating(rating) {
    var ratingStars = [];
    for (var i = 0; i < Math.floor(rating); i ++) {
      ratingStars.push(<Stars key={i + 10} filled="1" />);
    }
    if(rating > Math.floor(rating)) {
      console.log('here');
      ratingStars.push(<Stars key={20} filled="2" color={rating - Math.floor(rating)} />);
    }
    for (var i = Math.ceil(rating); i < 5; i ++) {
      ratingStars.push(<Stars key={i + 11} filled="0" />);
    }
    return ratingStars;
  }

  changeSort(e) {
    this.setState({ sort: e.target.value, reading: true, page: 1 }, this.getPageReview);
  }

  toggleExpandReviews() {
    const { reading } = this.state;
    this.setState({ reading: !reading });
  }

  goToPage(p) {
    this.setState({ page: p }, this.getPageReview);
  }

  writeReview() {
    document.getElementById("writeReview").showModal();
  }

  submitReview(input) {
    console.log(input);
    this.setState({reviewed: true});
    document.getElementById("writeReview").close();
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
        {page > 1 && <button type="submit" onClick={() => { this.goToPage(page - 1); }}>Previous Page</button> }
        <button type="submit" onClick={() => { this.goToPage(page + 1); }}>Next Page</button>
        <p>page {page}</p>
      </div>
    );
  }

  render() {
    const { reviews, sort, rating, meta, recommended, reviewNumber, overallRatings, product_id } = this.state;
    return (
      <div className="reviews-container">
        { meta ?
          (
          <div>
            <p>RATINGS & REVIEWS</p>
            {rating}
            {(rating !== 0) && this.starRating(rating) }
            <p>{recommended}% of reviews recommend this product</p>
            {overallRatings
            && (
              <Graph
                five={overallRatings[5] === undefined ? 0 : overallRatings[5]}
                four={overallRatings[4] === undefined ? 0 : overallRatings[4]}
                three={overallRatings[3] === undefined ? 0 : overallRatings[3]}
                two={overallRatings[2] === undefined ? 0 : overallRatings[2]}
                one={overallRatings[1] === undefined ? 0 : overallRatings[1]}
                reviewNumber={reviewNumber || 1}
              />

            ) }
            <dialog id="writeReview"><WriteReview submit={this.submitReview} product_id={product_id} name={this.props.name}/></dialog>
            <button type="submit" onClick={this.writeReview}>WriteReview</button>
            <output></output>
          </div>
          ) : <div>loading...</div>
        }
        {reviews ?
          (
            <div>
              <div>
                <p>{reviewNumber} reviews, sorted by <select value={sort} onChange={this.changeSort}>
                  <option value="relevant">most relevant</option>
                  <option value="newest">newest</option>
                  <option value="helpful">most helpful</option>
                </select>
                </p>
              </div>
              {this.renderReviews()}
            </div>
          ) : <div>loading...</div>
        }
      </div>
    );
  }
}

export default Reviews;
