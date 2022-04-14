import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import axios from 'axios';
import { postReview } from '../../requests';
// import { CLOUDINARY_UPLOAD_PRESET } from '../../../../config';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      recommend: null,
      characteristics: {},
      summary: '',
      body: '',
      nickname: '',
      email: '',
      cannotPost: '',
      uploadImg: [],
    };

    this.clickStar = this.clickStar.bind(this);
    this.showStar = this.showStar.bind(this);
    this.explainStar = this.explainStar.bind(this);
    this.postCurrReview = this.postCurrReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChara = this.handleChara.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
  }

  handleChara(e) {
    const { name } = e.target;
    const key = this.props.characteristics[name].id;
    this.setState({
      characteristics:
      {
        ...this.state.characteristics,
        [key]: Number(e.target.value),
      },
      cannotPost: '',
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      cannotPost: '',
    });
  }

  clickStar(rating) {
    this.setState({
      rating,
      cannotPost: '',
    });
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

  uploadImg(e) {
    const { uploadImg } = this.state;
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'cug53iht');
    axios.post('https://api.cloudinary.com/v1_1/cloverhong/image/upload', formData)
      .then((res) => {
        uploadImg.push(res.data.secure_url);
      })
      .then(() => {
        this.setState({ uploadImg });
      })
      .catch(console.log);
  }

  postCurrReview() {
    const {
      rating, recommend, summary, body, nickname, email, characteristics, uploadImg,
    } = this.state;
    if (rating === 0 || recommend === null || summary === '' || body.length < 50 || nickname === '' || !email.includes('@') || !email.includes('.') || Object.keys(characteristics).length !== Object.keys(this.props.characteristics).length) {
      this.setState({ cannotPost: 'Plase make sure all the fields are filled in correctly :)' });
    } else {
      postReview({
        product_id: Number(this.props.product_id),
        rating: Number(rating),
        recommend: (recommend === 'true'),
        characteristics,
        summary,
        body,
        name: nickname,
        email,
        photos: uploadImg,
      })
        .then(() => {
          $('input:radio').prop('checked', false);
          this.setState({
            rating: 0,
            recommend: null,
            characteristics: {},
            summary: '',
            body: '',
            nickname: '',
            email: '',
            cannotPost: '',
            uploadImg: [],
          });
        })
        .then(this.props.submit)
        .catch(console.log);
    }
  }

  renderChara() {
    const charaArr = [];
    const meaning = {
      Size: {
        1: 'A size too small',
        2: '½ a size too small',
        3: 'Perfect',
        4: '½ a size too big',
        5: 'A size too wide',
      },
      Width: {
        1: 'Too narrow',
        2: 'Slightly narrow',
        3: 'Perfect',
        4: 'Slightly wide',
        5: 'Too wide',
      },
      Comfort: {
        1: 'Uncomfortable',
        2: 'Slightly uncomfortable',
        3: 'Ok',
        4: 'Comfortable',
        5: 'Perfect',
      },
      Quality: {
        1: 'Poor',
        2: 'Below average',
        3: 'What I expected',
        4: 'Pretty great',
        5: 'Perfect',
      },
      Length: {
        1: 'Runs Short',
        2: 'Runs slightly short',
        3: 'Perfect',
        4: 'Runs slightly long',
        5: 'Runs long',
      },
      Fit: {
        1: 'Runs tight',
        2: 'Runs slightly tight',
        3: 'Perfect',
        4: 'Runs slightly long',
        5: 'Runs long',
      },
    };
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.props.characteristics) {
      if (Object.prototype.hasOwnProperty.call(this.props.characteristics, key)) {
        charaArr.push(
          <div key={key} className="charContainer">
            <p className="charKey">{key}</p>
            <div className="charSelector">
              <div className="charInput">
                <input type="radio" name={key} value={1} id={1} onChange={this.handleChara} />
                <label htmlFor={1}>{meaning[key][1]}</label>
              </div>
              <div className="charInput">
                <input type="radio" name={key} value={2} id={2} onChange={this.handleChara} />
                <label htmlFor={2}>{meaning[key][2]}</label>
              </div>
              <div className="charInput">
                <input type="radio" name={key} value={3} id={3} onChange={this.handleChara} />
                <label htmlFor={3}>{meaning[key][3]}</label>
              </div>
              <div className="charInput">
                <input type="radio" name={key} value={4} id={4} onChange={this.handleChara} />
                <label htmlFor={4}>{meaning[key][4]}</label>
              </div>
              <div className="charInput">
                <input type="radio" name={key} value={5} id={5} onChange={this.handleChara} />
                <label htmlFor={5}>{meaning[key][5]}</label>
              </div>
            </div>
          </div>,
        );
      }
    }
    return charaArr;
  }

  render() {
    return (
      <div className="writeReviewForm">
        <button className="mediumReviewButton" style={{ float: 'right' }} onClick={this.props.close}>✕</button>
        <h1>Write Your Review</h1>
        <h3>
          About
          {' '}
          {this.props.name}
        </h3>
        <div>
          <p>Your overall rating (required):</p>
          <div className="selectable star" onClick={() => { this.clickStar(1); }}>{this.showStar(1)}</div>
          <div className="selectable star" onClick={() => { this.clickStar(2); }}>{this.showStar(2)}</div>
          <div className="selectable star" onClick={() => { this.clickStar(3); }}>{this.showStar(3)}</div>
          <div className="selectable star" onClick={() => { this.clickStar(4); }}>{this.showStar(4)}</div>
          <div className="selectable star" onClick={() => { this.clickStar(5); }}>{this.showStar(5)}</div>
          <p style={{ display: 'inline-block' }}>{this.explainStar()}</p>
        </div>
        <div>
          <p>Do you recommend this product (required)? </p>
          <input type="radio" name="recommend" value="true" id="yes" onChange={this.handleChange} />
          <label htmlFor="yes">Yes</label>

          <input type="radio" name="recommend" value="false" id="no" onChange={this.handleChange} />
          <label htmlFor="no">No</label>
        </div>

        <div>
          <p>Characteristics (required)</p>
          {this.renderChara()}
        </div>
        <div>
          <p>Review summary (required)</p>
          <input style={{ width: '100%' }} type="text" value={this.state.summary} placeholder="Example: Best purchase ever!" onChange={this.handleChange} maxLength="60" name="summary" />
          <p>
            {this.state.summary.length}
            /60
          </p>
        </div>
        <div>
          <p>Review body (required, 50 characters minimum)</p>
          <textarea style={{ width: '100%', height: '200px' }} type="text" value={this.state.body} placeholder="Why did you like the product or not?" onChange={this.handleChange} maxLength="1000" name="body" />
          <p>
            {this.state.body.length}
            /1000
          </p>
        </div>
        <div>
          <p>Upload your photos</p>
          <input name="uploadImg" type="file" onChange={this.uploadImg} />
        </div>
        {this.state.uploadImg.map((img) => <img className="reviewThumbnails" key={img} src={img} />)}
        <div>
          <p>What is your nickname? (required)</p>
          <input style={{ width: '40%' }} type="text" value={this.state.nickname} placeholder="Example: jackson11!" onChange={this.handleChange} name="nickname" />
          <p>For privacy reasons, do not use your full name or email address</p>
        </div>
        <div>
          <p>What is your email? (required)</p>
          <input style={{ width: '40%' }} type="text" value={this.state.email} placeholder="Example: jackson11@email.com!" onChange={this.handleChange} name="email" />
          <p>For authentication only, you will not be emailed</p>
        </div>
        <p className="reviewCannotPostMessage">{this.state.cannotPost}</p>
        <button className="bigReviewButton" type="submit" onClick={this.postCurrReview}>Submit</button>
      </div>
    );
  }
}

WriteReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  submit: PropTypes.func,
  characteristics: PropTypes.object,
};

export default WriteReview;
