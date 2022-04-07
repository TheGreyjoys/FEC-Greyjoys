import React from 'react';
import PropTypes from 'prop-types';
import { postReview } from '../../requests';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      recommend: 'false',
      comfort: 0,
      quality: 0,
      length: 0,
      fit: 0,
      summary: '',
      body: '',
      nickname: '',
      email: '',
      cannotPost: false,
    };
    this.enterPlaceholder = this.enterPlaceholder.bind(this);
    this.clickStar = this.clickStar.bind(this);
    this.showStar = this.showStar.bind(this);
    this.explainStar = this.explainStar.bind(this);
    this.selectRecommend = this.selectRecommend.bind(this);
    this.rateComfort = this.rateComfort.bind(this);
    this.rateQuality = this.rateQuality.bind(this);
    this.rateLength = this.rateLength.bind(this);
    this.rateFit = this.rateFit.bind(this);
    this.summary = this.summary.bind(this);
    this.body = this.body.bind(this);
    this.nickname = this.nickname.bind(this);
    this.email = this.email.bind(this);
    this.postCurrReview = this.postCurrReview.bind(this);
  }

  postCurrReview() {
    const { rating, recommend, comfort, quality, length, fit, summary, body, nickname, email } = this.state;
    postReview({
      product_id: Number(this.props.product_id),
      rating: Number(rating),
      recommend: (recommend === 'true'),
      characteristics: {
        "135221": Number(comfort),
        "135222": Number(quality),
        "135220": Number(length),
        "135219": Number(fit)
      },
        summary: summary,
        body: body,
        name: nickname,
        email: email
      })
      .then((res) => {
        console.log(res.data);
      })
      .then(this.props.submit)
      .catch(console.log);
  }

  enterPlaceholder(e) {
    this.setState({ placeholder: e.target.value });
  }

  clickStar(rating) {
    this.setState({ rating });
  }

  showStar(position) {
    return this.state.rating >= position ? '★' : '☆';
  }

  explainStar() {
    const { rating } = this.state;
    if (rating === 1) {
      return '1 star - “Poor”';
    // eslint-disable-next-line no-else-return
    } else if (rating === 2) {
      return '2 stars - “Fair”';
    } else if (rating === 3) {
      return '3 stars - “Average”';
    } else if (rating === 4) {
      return '4 stars - “Good”';
    } else if (rating === 5) {
      return '5 stars - “Great”';
    }
  }

  selectRecommend(e) {
    this.setState({recommend: e.target.value});
  }

  rateComfort(e) {
    this.setState({comfort: e.target.value});
  }

  rateQuality(e) {
    this.setState({quality: e.target.value});
  }

  rateLength(e) {
    this.setState({length: e.target.value});
  }

  rateFit(e) {
    this.setState({fit: e.target.value});
  }

  summary(e) {
    this.setState({summary: e.target.value});
  }

  body(e) {
    this.setState({body: e.target.value});
  }

  nickname(e) {
    this.setState({nickname: e.target.value});
  }

  email(e) {
    this.setState({email: e.target.value});
  }

  render() {
    const { placeholder } = this.state;
    const { submit } = this.props;
    return (
      <div>
        <button style={{'float': 'right'}} onClick={this.props.submit}>X</button>
        <h1>Write Your Review</h1>
        <h3>About {this.props.name}</h3>
        <div>
          <p>Your overall rating (required):</p>
          <div className="selectable star" onClick={()=>{this.clickStar(1)}}>{this.showStar(1)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(2)}}>{this.showStar(2)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(3)}}>{this.showStar(3)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(4)}}>{this.showStar(4)}</div>
          <div className="selectable star" onClick={()=>{this.clickStar(5)}}>{this.showStar(5)}</div>
          <p style={{ 'display': 'inline-block'}}>{this.explainStar()}</p>
        </div>
        <div>
          <p>Do you recommend this product (required)? </p>
          <input type="radio" name="recommend" value="true" id="yes" onChange={this.selectRecommend}></input>
          <label htmlFor="yes">Yes</label>

          <input type="radio" name="recommend" value="false" id="no" onChange={this.selectRecommend}></input>
          <label htmlFor="no">No</label>
        </div>

        <div>
          <p>Characteristics</p>
          <li>
            Comfort
            <input type="radio" name="comfort" value={1} id={1} onChange={this.rateComfort}></input>
              <label htmlFor={1}>Uncomfortable</label>

              <input type="radio" name="comfort" value={2} id={2} onChange={this.rateComfort}></input>
              <label htmlFor={2}>Slightly uncomfortable</label>

              <input type="radio" name="comfort" value={3} id={3} onChange={this.rateComfort}></input>
              <label htmlFor={3}>Ok</label>

              <input type="radio" name="comfort" value={4} id={4} onChange={this.rateComfort}></input>
              <label htmlFor={4}>Comfortable</label>

              <input type="radio" name="comfort" value={5} id={5} onChange={this.rateComfort}></input>
              <label htmlFor={5}>Perfect</label>
          </li>
          <li>
            Quality
            <input type="radio" name="quality" value={1} id={1} onChange={this.rateQuality}></input>
              <label htmlFor={1}>Poor</label>

              <input type="radio" name="quality" value={2} id={2} onChange={this.rateQuality}></input>
              <label htmlFor={2}>Below average</label>

              <input type="radio" name="quality" value={3} id={3} onChange={this.rateQuality}></input>
              <label htmlFor={3}>What I expected</label>

              <input type="radio" name="quality" value={4} id={4} onChange={this.rateQuality}></input>
              <label htmlFor={4}>Pretty great</label>

              <input type="radio" name="quality" value={5} id={5} onChange={this.rateQuality}></input>
              <label htmlFor={5}>Perfect</label>
          </li>
          <li>
            Length
            <input type="radio" name="length" value={1} id={1} onChange={this.rateLength}></input>
              <label htmlFor={1}>Runs short</label>

              <input type="radio" name="length" value={2} id={2} onChange={this.rateLength}></input>
              <label htmlFor={2}>Runs slightly short</label>

              <input type="radio" name="length" value={3} id={3} onChange={this.rateLength}></input>
              <label htmlFor={3}>Perfect</label>

              <input type="radio" name="length" value={4} id={4} onChange={this.rateLength}></input>
              <label htmlFor={4}>Runs slightly long</label>

              <input type="radio" name="length" value={5} id={5} onChange={this.rateLength}></input>
              <label htmlFor={5}>Runs long</label>
          </li>
          <li>
            Fit
            <input type="radio" name="fit" value={1} id={1} onChange={this.rateFit}></input>
              <label htmlFor={1}>Runs tight</label>

              <input type="radio" name="fit" value={2} id={2} onChange={this.rateFit}></input>
              <label htmlFor={2}>Runs slightly tight</label>

              <input type="radio" name="fit" value={3} id={3} onChange={this.rateFit}></input>
              <label htmlFor={3}>Perfect</label>

              <input type="radio" name="fit" value={4} id={4} onChange={this.rateFit}></input>
              <label htmlFor={4}>Runs slightly loose</label>

              <input type="radio" name="fit" value={5} id={5} onChange={this.rateFit}></input>
              <label htmlFor={5}>Runs loose</label>
          </li>
        </div>
        <div>
          <p>Review summary (required)</p>
          <input style={{'width': '80%'}} type="text" value={this.state.summary} placeholder="Example: Best purchase ever!" onChange={this.summary} maxLength="60"></input>
          <p>{this.state.summary.length}/60</p>
        </div>
        <div>
          <p>Review body (required)</p>
          <textarea style={{'width': '100%', 'height': '200px'}} type="text" value={this.state.body} placeholder="Why did you like the product or not?" onChange={this.body} maxLength="1000"></textarea>
          <p>{this.state.body.length}/1000</p>
        </div>
        <div>
          <p>What is your nickname? (required)</p>
          <input style={{'width': '40%'}} type="text" value={this.state.nickname} placeholder="Example: jackson11!" onChange={this.nickname}></input>
          <p>For privacy reasons, do not use your full name or email address</p>
        </div>
        <div>
          <p>What is your email? (required)</p>
          <input style={{'width': '40%'}}type="text" value={this.state.email} placeholder="Example: jackson11@email.com!" onChange={this.email}></input>
          <p>For authentication reasons, you will not be emailed</p>
        </div>
        <button onClick={this.postCurrReview}>Submit</button>
      </div>
    );
  }
}

WriteReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  submit: PropTypes.func,
};

export default WriteReview;
