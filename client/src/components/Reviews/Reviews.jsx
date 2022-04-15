/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import React from 'react';
import $ from 'jquery';
import Review from './Review';
import WriteReview from './WriteReview';
import Graph from './Graph';
import { getReviews, getReviewsMeta } from '../../requests';
import starRating from '../../starRating';
import Graph2 from './Graph2';
import SearchReview from './SearchReview';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: null,
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
      filter: 0,
      search: '',
      filteredReviews: [],
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
    this.selectPage = this.selectPage.bind(this);
    this.getAllReviews = this.getAllReviews.bind(this);
    this.search = this.search.bind(this);
    this.filterAllReviews = this.filterAllReviews.bind(this);
    this.ratingGraph = this.ratingGraph.bind(this);
    this.filterRating = this.filterRating.bind(this);
  }

  componentDidMount() {
    this.getMeta(() => { this.getAllReviews(this.getPageReview); });
  }

  componentDidUpdate() {
    const { product_id, filter } = this.state;
    const { id } = this.props;
    if (product_id !== id) {
      $(`#filter-rating-${filter}`).css({ color: 'rgb(85, 85, 85)', 'border-bottom': '1px solid rgb(85, 85, 85)' });
      this.setState({
        product_id: id,
        page: 1,
        sort: 'relevant',
        reading: false,
        filter: 0,
        search: '',
      }, () => { this.getMeta(() => { this.getAllReviews(this.getPageReview); }); });
    }
  }

  getPageReview() {
    const { page, filteredReviews } = this.state;
    this.setState({ reviews: filteredReviews.slice((page - 1) * 5, page * 5) });
  }

  getAllReviews(callback) {
    const { sort, product_id, reviewNumber } = this.state;
    getReviews(product_id, sort, 1, reviewNumber)
      .then((res) => {
        this.setState({ allReviews: res.data.results });
      })
      .then(this.filterAllReviews)
      .then(callback)
      .catch(console.log);
  }

  getMeta(callback, forced = false) {
    const { product_id } = this.state;

    getReviewsMeta(product_id, forced)
      .then((res) => {
        let sum = 0;
        let people = 0;
        for (const key in res.data.ratings) {
          if (Object.prototype.hasOwnProperty.call(res.data.ratings, key)) {
            sum += key * res.data.ratings[key];
            people += Number(res.data.ratings[key]);
          }
        }
        const average = people ? Number(sum / people).toFixed(1) : 0;
        const recTrue = res.data.recommended.true ? res.data.recommended.true : 0;
        const recFalse = res.data.recommended.false ? res.data.recommended.false : 0;
        this.setState({
          meta: res.data,
          reviewNumber: people,
          rating: average,
          overallRatings: res.data.ratings,
          recommended: (100 * recTrue / (Number(recFalse) + Number(recTrue))).toFixed(1),
        });
      })
      .then(callback)
      .catch(console.log);
  }

  filterAllReviews(callback) {
    const { filter, allReviews, search } = this.state;
    const filteredReviews = [];
    allReviews.forEach((review) => {
      if ((review.body.includes(search) || review.summary.includes(search))
        && (review.rating === filter || filter === 0)) { filteredReviews.push(review); }
    });
    this.setState({ filteredReviews }, callback);
  }

  search(input) {
    this.setState(
      { search: input, reading: true, page: 1 },
      () => { this.filterAllReviews(this.getPageReview); },
    );
  }

  filterRating(rating) {
    const { filter } = this.state;
    if (filter !== rating) {
      $(`#filter-rating-${filter}`).css({ color: 'rgb(85, 85, 85)', 'border-bottom': '1px solid rgb(85, 85, 85)' });
      this.setState(
        { filter: rating, reading: true, page: 1 },
        () => { this.filterAllReviews(this.getPageReview); },
      );
      $(`#filter-rating-${rating}`).css({ color: 'lightgrey', 'border-bottom': '1px solid lightgrey' });
    } else {
      $(`#filter-rating-${rating}`).css({ color: 'rgb(85, 85, 85)', 'border-bottom': '1px solid rgb(85, 85, 85)' });
      this.setState(
        { filter: 0, reading: true, page: 1 },
        () => { this.filterAllReviews(this.getPageReview); },
      );
    }
  }

  changeSort(e) {
    this.setState(
      { sort: e.target.value, reading: true, page: 1 },
      () => { this.getAllReviews(this.getPageReview); },
    );
  }

  toggleExpandReviews() {
    const { reading } = this.state;
    this.setState({ reading: !reading });
  }

  goToPage(p) {
    this.setState({ page: p }, this.getPageReview);
  }

  writeReview() {
    document.getElementById('writeReview').showModal();
  }

  submitReview() {
    this.closeWrite();
    this.getMeta(this.getAllReviews, /* forced = */true);
  }

  closeWrite() {
    document.getElementById('writeReview').close();
  }

  ratingGraph() {
    const { overallRatings, reviewNumber } = this.state;
    const graph = [];
    for (let i = 5; i > 0; i -= 1) {
      graph.push(
        <Graph
          key={i}
          rating={i}
          count={overallRatings[i] ? overallRatings[i] : 0}
          reviewNumber={reviewNumber || 1}
          filterRating={this.filterRating}
        />,
      );
    }
    return graph;
  }

  charGraph() {
    const { meta } = this.state;
    const { characteristics } = meta;
    const graph2 = [];
    for (const key in characteristics) {
      if (Object.prototype.hasOwnProperty.call(characteristics, key)) {
        graph2.push(<Graph2 chara={key} key={key} value={characteristics[key].value} />);
      }
    }
    return graph2;
  }

  selectPage() {
    const { page, filteredReviews } = this.state;
    const pagesArr = [];
    const maxPage = Math.ceil(filteredReviews.length / 5);
    let i;
    if (maxPage - page >= 2) {
      i = page > 2 ? page - 2 : 1;
    } else {
      i = maxPage - 5 >= 1 ? maxPage - 5 : 1;
    }
    const startI = i;
    while ((i <= 5 || i <= page + 2) && i <= maxPage) {
      const j = i;
      if (i === page) {
        pagesArr.push(<p key={i} style={{ fontWeight: 'bold' }}>{page}</p>);
      } else {
        pagesArr.push(<button className="smallReviewButton" key={i} type="submit" onClick={() => { this.goToPage(j); }}>{i}</button>);
      }
      i += 1;
    }
    return (
      <div className="reviewPageSelector">
        {startI > 1 && <p>...</p>}
        {pagesArr}
        {i - 1 < maxPage && <p>...</p>}
      </div>
    );
  }

  renderReviews() {
    const { reviews, reading, page, filteredReviews } = this.state;
    const { length } = reviews;
    const maxPage = Math.ceil(filteredReviews.length / 5);
    if (length === 0 && page === 1) { return 'No Reviews'; }
    if (!reading) {
      return (
        <div>
          <div className="render-reviews" style={{ height: 'auto' }}>
            {reviews.length === 0 && <p>No More Reviews</p>}
            {reviews[0] && <Review key={reviews[0].review_id} review={reviews[0]} getAllReviews={this.getAllReviews} />}
            {reviews[1] && <Review key={reviews[1].review_id} review={reviews[1]} getAllReviews={this.getAllReviews} />}
          </div>
          <button className="bigReviewButton" type="submit" onClick={this.toggleExpandReviews} disabled={length <= 2 && page === 1}>
            {(length <= 2 && page === 1) && 'NO '}MORE REVIEWS</button>
        </div>
      );
    }
    return (
      <div>
        <div className="render-reviews" style={{ height: '80vh' }}>
          {reviews.length === 0 && <p>No More Reviews</p>}
          {reviews.map((review) => <Review key={review.review_id} review={review} getAllReviews={this.getAllReviews} />)}
          <button className="mediumReviewButton" type="submit" onClick={() => { this.goToPage(1); }} disabled={page <= 1}>
            {page > 1 && '«'}{' '}BACK TO FIRST PAGE</button>
          <button className="mediumReviewButton" type="submit" onClick={() => { this.goToPage(page - 1); }} disabled={page <= 1}>
            {page > 1 && '‹'}{' '}PREVIOUS PAGE</button>
          {this.selectPage()}
          <button className="mediumReviewButton" type="submit" onClick={() => { this.goToPage(page + 1); }} disabled={page >= maxPage}>
            NEXT PAGE{' '}{page < maxPage && '›'}</button>
          <p style={{ float: 'right' }}>{maxPage}{' '}{maxPage > 1 ? 'pages' : 'page'}</p>
        </div>
        <button type="submit" onClick={this.toggleExpandReviews} className="bigReviewButton">COLLAPSE</button>
      </div>
    );
  }

  render() {
    const {
      reviews, sort, rating, meta, recommended, reviewNumber, product_id,
    } = this.state;

    return (
      <div className="reviews-container">
        { meta
          ? (
            <div className="reviews-meta">
              <p>RATINGS & REVIEWS</p>
              <p style={{ fontSize: '40', display: 'inline-block', margin: '3px' }}><b>{rating === 0 ? '' : rating}</b></p>
              {(rating !== 0) ? starRating(rating) : <div>☆☆☆☆☆</div> }
              <p>{recommended}% of reviews recommend this product</p>
              <div className="rating_graph">{this.ratingGraph()}</div>
              <div className="char_graph">{this.charGraph()}</div>
              <div>
                <dialog id="writeReview">
                  <WriteReview
                    submit={this.submitReview}
                    product_id={product_id}
                    name={this.props.name}
                    characteristics={meta.characteristics}
                    close={this.closeWrite}
                  />
                </dialog>
                <button className="bigReviewButton" type="submit" onClick={this.writeReview}>ADD A REVIEW +</button>
                <output />
              </div>
            </div>
          ) : <div>loading...</div>}
        {reviews
          ? (
            <div className="reviews-main">
              <div className="review-sort">
                <p style={{ display: 'inline-block' }}>{reviewNumber}{' '}reviews, sorted by{' '}
                  <select value={sort} onChange={this.changeSort}>
                    <option value="relevant">most relevant</option>
                    <option value="newest">newest</option>
                    <option value="helpful">most helpful</option>
                  </select>
                </p>
                <SearchReview search={this.search} product_id={product_id} />
              </div>
              <div>{this.renderReviews()}</div>
            </div>
          ) : <div>loading...</div>}
      </div>
    );
  }
}

export default Reviews;
