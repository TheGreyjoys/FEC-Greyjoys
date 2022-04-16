/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

class SearchReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { product_id } = this.props;
    if (product_id !== prevProps.product_id) {
      this.setState({ search: '' });
    }
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    return (
      <div className="reviewSearchBar">
        <input type="search" value={this.state.search} onChange={this.handleChange} minLength="3" placeholder="Search reviews..." />
        <button
          className="mediumReviewButton"
          style={{ borderLeft: '1px solid rgb(85, 85, 58)' }}
          type="submit"
          onClick={() => {
            this.setState(
              { search: '' },
              () => { this.props.search(''); },
            );
          }}
        >
          Clear

        </button>
        <button
          className="mediumReviewButton"
          style={{ borderLeft: '1px solid rgb(85, 85, 58)' }}
          type="submit"
          onClick={() => { this.props.search(this.state.search); }}
        >
          Search

        </button>
      </div>
    );
  }
}

SearchReview.propTypes = {
  product_id: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired,
};

export default SearchReview;
