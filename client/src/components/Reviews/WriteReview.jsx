/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { postReview } from '../../requests';
import meaning from './meaning';

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
    this.inputRef = React.createRef();
    this.clickStar = this.clickStar.bind(this);
    this.showStar = this.showStar.bind(this);
    this.postCurrReview = this.postCurrReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChara = this.handleChara.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { product_id } = this.props;
    if (product_id !== prevProps.product_id) {
      this.clearForm();
    }
  }

  handleChara(e) {
    const { name } = e.target;
    const { characteristics } = this.props;
    const key = characteristics[name].id;
    this.setState((prevState) => (
      {
        characteristics:
        {
          ...prevState.characteristics,
          [key]: Number(e.target.value),
        },
        cannotPost: '',
      }
    ));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, cannotPost: '' });
  }

  clickStar(rating) {
    this.setState({ rating, cannotPost: '' });
  }

  showStar(position) {
    const { rating } = this.state;
    return rating >= position ? '★' : '☆';
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

  clearForm() {
    this.inputRef.current.value = null;
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
  }

  postCurrReview() {
    const {
      rating, recommend, summary, body, nickname, email, characteristics, uploadImg,
    } = this.state;
    const { submit, product_id } = this.props;
    if (rating === 0 || recommend === null || summary === '' || body.length < 50 || nickname === '' || !email.includes('@') || !email.includes('.') || Object.keys(characteristics).length !== Object.keys(this.props.characteristics).length) {
      this.setState({ cannotPost: 'Plase make sure all the fields are filled in correctly :)' });
    } else {
      postReview({
        product_id: Number(product_id),
        rating: Number(rating),
        recommend: (recommend === 'true'),
        characteristics,
        summary,
        body,
        name: nickname,
        email,
        photos: uploadImg,
      })
        .then(this.clearForm)
        .then(submit)
        .catch(console.log);
    }
  }

  renderChara() {
    const charaArr = [];
    const { characteristics } = this.props;
    const keys = Object.keys(characteristics);
    for (let j = 0; j < keys.length; j += 1) {
      const charInputs = [];
      for (let i = 1; i < 6; i += 1) {
        charInputs.push(
          <div className="charInput" key={keys[j] + i}>
            <input type="radio" name={keys[j]} value={i} id={i} onChange={this.handleChara} checked={this.state.characteristics[characteristics[keys[j]].id] === i} />
            <label htmlFor={i}>{meaning[keys[j]][i]}</label>
          </div>,
        );
      }
      charaArr.push(
        <div key={keys[j]} className="charContainer">
          <p className="charKey">{keys[j]}</p>
          <div className="charSelector">
            {charInputs}
          </div>
        </div>,
      );
    }
    return charaArr;
  }

  render() {
    const stars = [];
    const { close, name } = this.props;
    const {
      recommend, summary, body, uploadImg, nickname, email, cannotPost, rating,
    } = this.state;
    for (let i = 1; i < 6; i += 1) {
      stars.push(<div className="selectable star" role="button" tabIndex={0} key={i} onClick={() => { this.clickStar(i); }} onKeyDown={() => { this.clickStar(i); }}>{this.showStar(i)}</div>);
    }
    return (
      <div className="writeReviewForm">
        <button className="mediumReviewButton" type="submit" style={{ float: 'right' }} onClick={close}>✕</button>
        <h1>Write Your Review</h1>
        <h3>
          About
          {' '}
          {name}
        </h3>
        <div>
          <p>Your overall rating (required):</p>
          {stars}
          <p style={{ display: 'inline-block' }}>{meaning.Star[rating]}</p>
        </div>
        <div>
          <p>Do you recommend this product (required)? </p>
          <input type="radio" name="recommend" value="true" id="yes" onChange={this.handleChange} checked={recommend === 'true'} />
          <label htmlFor="yes">Yes</label>

          <input type="radio" name="recommend" value="false" id="no" onChange={this.handleChange} checked={recommend === 'false'} />
          <label htmlFor="no">No</label>
        </div>

        <div>
          <p>Characteristics (required)</p>
          {this.renderChara()}
        </div>
        <div>
          <p>Review summary (required)</p>
          <input style={{ width: '100%' }} type="text" value={summary} placeholder="Example: Best purchase ever!" onChange={this.handleChange} maxLength="60" name="summary" />
          <p>
            {summary.length}
            /60
          </p>
        </div>
        <div>
          <p>Review body (required, 50 characters minimum)</p>
          <textarea style={{ width: '100%', height: '200px' }} type="text" value={body} placeholder="Why did you like the product or not?" onChange={this.handleChange} maxLength="1000" name="body" />
          <p>
            {body.length}
            /1000
          </p>
        </div>
        <div>
          <p>Upload your photos</p>
          <input name="uploadImg" type="file" onChange={this.uploadImg} ref={this.inputRef} />
        </div>
        {uploadImg.map((img) => <img className="reviewThumbnails" key={img} src={img} alt="uploaded" />)}
        <button type="submit" onClick={() => { this.inputRef.current.value = null; this.setState({ uploadImg: [] }); }}>Clear </button>
        <div>
          <p>What is your nickname? (required)</p>
          <input style={{ width: '40%' }} type="text" value={nickname} placeholder="Example: jackson11!" onChange={this.handleChange} name="nickname" />
          <p>For privacy reasons, do not use your full name or email address</p>
        </div>
        <div>
          <p>What is your email? (required)</p>
          <input style={{ width: '40%' }} type="text" value={email} placeholder="Example: jackson11@email.com!" onChange={this.handleChange} name="email" />
          <p>For authentication only, you will not be emailed</p>
        </div>
        <p className="reviewCannotPostMessage">{cannotPost}</p>
        <button className="bigReviewButton" type="submit" onClick={this.postCurrReview} style={{ display: 'inline-block' }}>Submit</button>
        <button className="bigReviewButton" type="submit" onClick={this.clearForm} style={{ display: 'inline-block' }}>Clear Form</button>
      </div>
    );
  }
}

WriteReview.propTypes = {
  product_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  characteristics: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  })),
};

WriteReview.defaultProps = {
  characteristics: {},
};

export default WriteReview;
