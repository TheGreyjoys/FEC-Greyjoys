/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
import React from 'react';
import $ from 'jquery';
import { markHelpful, markReported } from '../../requests';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      helpful: this.props.review.helpfulness,
      markedHelpful: localStorage.getItem(`markedHelpful${this.props.review.review_id}`),
      reported: false,
      expandedImg: '',
    };
    this.expand = this.expand.bind(this);
    this.stars = this.stars.bind(this);
    this.helpful = this.helpful.bind(this);
    this.report = this.report.bind(this);
    this.getDate = this.getDate.bind(this);
    this.toggleExpandImg = this.toggleExpandImg.bind(this);
  }

  getDate() {
    let time = new Date(this.props.review.date);
    time = time.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return time;
  }

  report(id) {
    markReported(id)
      .then(() => {
        this.setState({ reported: true });
      })
      .then(this.props.getAllReviews)
      .catch(console.log);
  }

  helpful(id) {
    const { helpful } = this.state;
    if (localStorage.getItem(`markedHelpful${id}`) !== 'true') {
      markHelpful(id)
        .then(() => {
          this.setState({ helpful: Number(helpful) + 1 });
        })
        .then(() => {
          localStorage.setItem(`markedHelpful${id}`, 'true');
        })
        .then(() => {
          this.setState({ markedHelpful: localStorage.getItem(`markedHelpful${this.props.review.review_id}`) });
        })
        .then(this.props.getAllReviews)
        .catch(console.log);
    }
  }

  expand() {
    const { clicked } = this.state;
    this.setState({ clicked: !clicked });
  }

  stars(rating) {
    let ratingStars = '';
    for (let i = 0; i < rating; i += 1) {
      ratingStars += '★';
    }
    for (let i = rating; i < 5; i += 1) {
      ratingStars += '☆';
    }
    return ratingStars;
  }

  toggleExpandImg(e) {
    const oldImg = this.state.expandedImg;
    if (this.state.expandedImg !== e.target.id) {
      this.setState({ expandedImg: e.target.id }, () => {
        $(`#${e.target.id}`).css('width', '60%');
        if (oldImg !== '') {
          $(`#${oldImg}`).css('width', '20%');
        }
      });
    } else {
      this.setState({ expandedImg: '' }, () => { $(`#${e.target.id}`).css('width', '20%'); });
    }
  }

  render() {
    const {
      clicked, helpful, markedHelpful, reported,
    } = this.state;
    const { review } = this.props;
    const {
      rating, reviewer_name, summary, body, recommend, response, review_id, photos,
    } = review;
    if (reported === true) {
      return (
        <div className="review" style={{ color: 'lightgrey' }}>
          reported
          <div className="dividingLine" />
        </div>
      );
    }
    return (
      <ul className="review">
        <div>
          {this.stars(rating)}
          <div className="reviewNameAndDate">{reviewer_name},{' '}{this.getDate()}</div>
        </div>
        <p className="reviewSummary">{clicked ? summary : summary.slice(0, 61)}</p>
        <p>{clicked ? body : summary.slice(61) + body.slice(0, 251)}</p>
        {body.length > 250 && <button className="smallReviewButton" type="submit" onClick={this.expand}>show more</button>}
        <div className="reviewRecommend">{recommend ? '✓ I recommend this product.' : "✖ I don't recommend this product."}</div>
        {response && (
        <div className="reviewResponse">
          <h5>Response:</h5>
          <p>{response}</p>
        </div>
        )}
        <div>{photos.length !== 0
          && photos.slice(0, 5).map((photo) => <img className="reviewPhoto" key={photo.id} id={photo.id} src={photo.url} alt="review" onClick={this.toggleExpandImg} />)}
        </div>
        <button className="smallReviewButton" type="submit" onClick={() => { this.helpful(review_id); }} disabled={markedHelpful === 'true'}>
          Helpful({helpful})
        </button>
        <button
          className="smallReviewButton"
          type="submit"
          onClick={() => { this.report(review_id); }}
        >Report
        </button>
        <div className="dividingLine" />
      </ul>
    );
  }
}

export default Review;
