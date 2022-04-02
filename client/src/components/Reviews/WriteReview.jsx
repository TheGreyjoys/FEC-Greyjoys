import React from 'react';
import PropTypes from 'prop-types';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
    };
    this.enterPlaceholder = this.enterPlaceholder.bind(this);
  }

  enterPlaceholder(e) {
    this.setState({ placeholder: e.target.value });
  }

  render() {
    const { placeholder } = this.state;
    const { submit } = this.props;
    return (
      <form>
        <label>
          Review Form Placeholder
          <input type="text" value={placeholder} onChange={this.enterPlaceholder} placeholder="just a placeholder input area" />
          <button type="submit" onClick={() => { submit(placeholder); }}>Submit</button>
        </label>
      </form>
    );
  }
}

WriteReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  submit: PropTypes.func,
};

export default WriteReview;
