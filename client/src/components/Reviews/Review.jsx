/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
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

  expand() {
    const { clicked } = this.state;
    this.setState({ clicked: !clicked });
  }

  helpful(id) {
    console.log(id);
    const { helpful } = this.state;
    console.log(localStorage.getItem(`markedHelpful${id}`));
    if (localStorage.getItem(`markedHelpful${id}`) !== 'true') {
      console.log('helpful');
      markHelpful(id)
        .then((res) => {
          console.log(res);
          this.setState({ helpful: Number(helpful) + 1 });
        })
        .then(() => {
          localStorage.setItem(`markedHelpful${id}`, 'true');
        })
        .then(() => {
          this.setState({ markedHelpful: localStorage.getItem(`markedHelpful${this.props.review.review_id}`) });
        })
        .catch(console.log);
    }
  }

  report(id) {
    markReported(id)
      .then(() => {
        this.setState({ reported: true });
      })
      .catch(console.log);
  }

  getDate() {
    let time = new Date(this.props.review.date);
    time = time.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return time;
  }

  stars(rating) {
    let ratingStars = '';
    for (var i = 0; i < rating; i++) {
      ratingStars += '★';
    }
    for (var i = rating; i < 5; i++) {
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
        console.log(this.state.expandedImg);
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
      return <div>reported</div>;
    }
    if (clicked === false) {
      return (
        <ul className="review">
          <div>
            {this.stars(rating)}
            <div style={{ float: 'right', display: 'inline-block' }}>
              {reviewer_name}
              ,
              {' '}
              {this.getDate()}
            </div>
          </div>
          <h4>{summary.slice(0, 61)}</h4>
          <p>
            {summary.slice(61)}
            {body.slice(0, 251)}
          </p>
          {body.length > 250 && <button className="smallButton" type="submit" onClick={this.expand}>show more</button>}
          {recommend ? <div>✓ I recommend this product.</div> : <div>✖ I don't recommend this product.</div>}
          {response && (
          <div className="reviewResponse">
            Response:
            {response}
          </div>
          )}
          <div>
            {photos.length !== 0 && photos.slice(0, 5).map((photo) => { return <img className="reviewPhoto" id={photo.id} src={photo.url} alt="review photo" onClick={this.toggleExpandImg} />})}
          </div>
          {markedHelpful === 'true'
            ? (
              <button className="smallButton" style={{ borderBottom: '0px' }} disabled>
                Helpful(
                {helpful}
                )
              </button>
            )
            : (
              <button
                className="smallButton"
                type="submit"
                onClick={() => { this.helpful(review_id); }}
              >
                Helpful(
                {helpful}
                )

              </button>
            ) }
          <button
            className="smallButton"
            type="submit"
            onClick={() => { this.report(review_id); }}
          >
            Report

          </button>
          <div className="dividingLine" />
        </ul>
      );
    }
    return (
      <ul className="review">
        <div>
          {this.stars(rating)}
          <div style={{ float: 'right', display: 'inline-block' }}>
            {reviewer_name}
            ,
            {' '}
            {this.getDate()}
          </div>
        </div>
        <p><b>{summary}</b></p>
        <p>{body}</p>
        <button className="smallButton" type="submit" onClick={this.expand}>show less</button>
        {recommend ? <div>v I recommend this product.</div> : <div>x No I don't recommend this product.</div>}
        {response && (
        <div>
          Response:
          {response}
        </div>
        )}
        <div>
          {photos.length !== 0 && photos.slice(0, 5).map((photo) => {return <img className="reviewPhoto" id={photo.id} src={photo.url} alt="review photo" onClick={this.toggleExpandImg} />})}
        </div>
        {markedHelpful === 'true'
          ? (
            <button className="smallButton" style={{ borderBottom: '0px' }} disabled>
              Helpful(
              {helpful}
              )
            </button>
          )
          : (
            <button
              className="smallButton"
              type="submit"
              onClick={() => { this.helpful(review_id); }}
            >
              Helpful(
              {helpful}
              )

            </button>
          ) }
        <button
          className="smallButton"
          type="submit"
          onClick={() => { this.report(review_id); }}
        >
          Report

        </button>
        <div className="dividingLine" />
      </ul>
    );
  }
}

Review.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  review: PropTypes.object,
};

export default Review;
