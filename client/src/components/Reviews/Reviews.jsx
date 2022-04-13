/* eslint-disable camelcase */
import React from 'react';
import $ from 'jquery';
import Review from './Review';
import WriteReview from './WriteReview';
import Graph from './Graph';
import { getReviews, getReviewsMeta } from '../../requests';
import starRating from '../../starRating';
import Graph2 from './Graph2';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* need current product id */
      /* need current product name */
      reviews: null,
      product_id: this.props.id,
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
    this.charGraph = this.charGraph.bind(this);
    this.closeWrite = this.closeWrite.bind(this);
  }

  componentDidMount() {
    this.getMeta();
    this.getPageReview();
  }

  componentDidUpdate() {
    if (this.state.product_id !== this.props.id) {
      this.setState({
        product_id: this.props.id,
        page: 1,
        sort: 'relevant',
        reading: false,
      }, () => { this.getMeta(); this.getPageReview(); });
    }
  }

  getPageReview() {
    const { page, sort, product_id } = this.state;
    getReviews(product_id, sort, page)
      .then((res) => {
        console.log(res.data);
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
        for (const key in res.data.ratings) {
          sum += key * res.data.ratings[key];
          people += Number(res.data.ratings[key]);
        }
        const average = people ? Number(sum / people).toFixed(1) : 0;
        const recTrue = res.data.recommended.true ? res.data.recommended.true : 0;
        const recFalse = res.data.recommended.false ? res.data.recommended.false : 0;
        this.setState({
          meta: res.data,
          reviewNumber: people,
          rating: average,
          overallRatings: res.data.ratings,
          recommended: (
            100 * recTrue
            / (Number(recFalse)
            + Number(recTrue))
          ).toFixed(1),
        });
      })
      .catch(console.log);
  }

  changeSort(e) {
    this.setState({ sort: e.target.value, reading: true, page: 1 }, this.getPageReview);
  }

  toggleExpandReviews() {
    const { reading } = this.state;
    this.setState({ reading: !reading }, () => {
      if (!this.state.reading) {
        $('.render-reviews').css({ height: 'auto', position: 'relative' });
      } else {
        $('.render-reviews').css({ height: '80vh', position: 'relative' });
      }
    });
  }

  goToPage(p) {
    this.setState({ page: p }, this.getPageReview);
  }

  writeReview() {
    document.getElementById('writeReview').showModal();
  }

  submitReview() {
    this.setState({ reviewed: true });
    this.closeWrite();
    this.getPageReview();
  }

  closeWrite() {
    document.getElementById('writeReview').close();
  }

  charGraph() {
    const graph2 = [];
    for (const key in this.state.meta.characteristics) {
      graph2.push(<Graph2 chara={key} key={key} value={this.state.meta.characteristics[key].value} />);
    }
    return graph2;
  }

  renderReviews() {
    const { reviews, reading, page } = this.state;
    if (reviews.length === 0) {
      if (page > 1) {
        return (
          <div>
            <p>No more reviews!</p>
            <button className="mediumReviewButton" type="submit" onClick={() => { this.goToPage(page - 1); }}>back</button>
            <button className="mediumReviewButton" type="submit" onClick={() => { this.goToPage(1); }}>back to first page</button>
          </div>
        );
      }
      return 'no reviews';
    }
    if (!reading) {
      return (
        <div>
          <div className="render-reviews">
            <Review key={reviews[0].review_id} review={reviews[0]} />
            {reviews[1] && <Review key={reviews[1].review_id} review={reviews[1]} />}
          </div>
          <button className="bigReviewButton" type="submit" onClick={this.toggleExpandReviews}>More Reviews</button>
        </div>

      );
    }
    return (
      <div>
        <div className="render-reviews">
          {reviews.map((review) => <Review key={review.review_id} review={review} />)}
          {page > 1 && <button className="mediumReviewButton" type="submit" onClick={() => { this.goToPage(page - 1); }}>Previous Page</button> }
          <button className="mediumReviewButton" type="submit" onClick={() => { this.goToPage(page + 1); }}>Next Page</button>
          {page > 1 && <button className="mediumReviewButton" type="submit" onClick={() => { this.goToPage(1); }}>back to first page</button>}
          <p>
            page
            {' '}
            {page}
          </p>
        </div>
        <button type="submit" onClick={this.toggleExpandReviews} className="bigReviewButton">Collapse</button>
      </div>
    );
  }

  render() {
    const {
      reviews, sort, rating, meta, recommended, reviewNumber, overallRatings, product_id, reviewed,
    } = this.state;
    return (
      <div className="reviews-container">
        { meta
          ? (
            <div className="reviews-meta">
              <p>RATINGS & REVIEWS</p>
              <p style={{ fontSize: '40', display: 'inline-block', margin: '3px' }}><b>{rating}</b></p>
              {(rating !== 0) ? starRating(rating) : <div>☆☆☆☆☆</div> }
              <p>
                {recommended}
                % of reviews recommend this product
              </p>
              {overallRatings
            && (
              <div>
                <Graph
                  five={overallRatings[5] ? overallRatings[5] : 0}
                  four={overallRatings[4] ? overallRatings[4] : 0}
                  three={overallRatings[3] ? overallRatings[3] : 0}
                  two={overallRatings[2] ? overallRatings[2] : 0}
                  one={overallRatings[1] ? overallRatings[1] : 0}
                  reviewNumber={reviewNumber || 1}
                />
                {this.charGraph()}
              </div>

            ) }
              { !reviewed ? (
                <div>
                  <dialog id="writeReview">
                    <WriteReview
                      submit={this.submitReview}
                      product_id={product_id}
                      name={this.props.name}
                      category={this.props.category}
                      characteristics={meta.characteristics}
                      close={this.closeWrite}
                    />
                  </dialog>
                  <button
                    className="bigReviewButton"
                    type="submit"
                    onClick={this.writeReview}
                  >
                    ADD A REVIEW +
                  </button>
                  <output />
                </div>
              )
                : (
                  <button
                    disabled
                    className="bigReviewButton"
                    type="submit"
                    onClick={this.writeReview}
                  >
                    ADD A REVIEW +
                  </button>
                )}
            </div>
          ) : <div>loading...</div>}
        {reviews
          ? (
            <div className="reviews-main">
              <div>
                <p>
                  {reviewNumber}
                  {' '}
                  reviews, sorted by
                  {' '}
                  <select value={sort} onChange={this.changeSort}>
                    <option value="relevant">most relevant</option>
                    <option value="newest">newest</option>
                    <option value="helpful">most helpful</option>
                  </select>
                </p>
              </div>
              <div>
                {this.renderReviews()}
              </div>
            </div>
          ) : <div>loading...</div>}
      </div>
    );
  }
}

export default Reviews;
