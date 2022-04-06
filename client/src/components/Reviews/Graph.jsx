import React from 'react';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="rating_graph">
        <div className="rating">
          <p>5 stars</p>
          <p>{this.props.five}</p>
          <div className="bar">
            <div className="filled" style={{ width: `${Number(this.props.five) / this.props.reviewNumber * 100}%` }}></div>
          </div>
        </div>
        <div className="rating">
          <p>4 stars</p>
          <p>{this.props.four}</p>
          <div className="bar">
            <div className="filled" style={{ width: `${Number(this.props.four) / this.props.reviewNumber * 100}%`  }}></div>
          </div>
        </div>
        <div className="rating">
          <p>3 stars</p>
          <p>{this.props.three}</p>
          <div className="bar">
            <div className="filled" style={{ width: `${Number(this.props.three) / this.props.reviewNumber * 100}%` }}></div>
          </div>
        </div>
        <div className="rating">
          <p>2 stars</p>
          <p>{this.props.two}</p>
          <div className="bar">
            <div className="filled" style={{ width: `${Number(this.props.two) / this.props.reviewNumber * 100}%` }}></div>
          </div>
        </div>
        <div className="rating">
          <p>1 stars</p>
          <p>{this.props.one}</p>
          <div className="bar">
            <div className="filled" style={{ width: `${Number(this.props.one) / this.props.reviewNumber * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;
