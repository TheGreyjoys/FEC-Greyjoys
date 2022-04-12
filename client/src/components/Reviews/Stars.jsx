import React from 'react';
import $ from 'jquery';

function Stars(props) {
  if (props.filled === '1') {
    return <div style={{ fontSize: '16px' }} className="star">★</div>;
  }
  if (props.filled === '2') {
    const halfStar = (
      <div className="halfStar star"
        style={{background: `linear-gradient(to right,
          rgb(85, 85, 85) 0% ${props.color * 100}%,
          white ${props.color * 100}% 100%)`,
        WebkitTextFillColor: 'transparent',
        WebkitTextStrokeWidth: '1px',
        WebkitTextStrokeColor: 'rgb(85, 85, 85)',
        fontSize: '13px',
        top: '-1px',
        position: 'relative',
        'WebkitBackgroundClip': 'text'}}
      >★</div>
    );
    $('.halfStar').css('webkit-background-clip', 'text');
    return halfStar;
  }
  return <div className="star">☆</div>;
}

export default Stars;
