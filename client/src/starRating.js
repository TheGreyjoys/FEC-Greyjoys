import React from 'react';
import Stars from './components/Reviews/Stars';

function starRating(rating) {
  var ratingStars = [];
  for (var i = 0; i < Math.floor(rating); i ++) {
    ratingStars.push(<Stars key={i + 10} filled="1" />);
  }
  if(rating > Math.floor(rating)) {
    console.log('here');
    ratingStars.push(<Stars key={20} filled="2" color={rating - Math.floor(rating)} />);
  }
  for (var i = Math.ceil(rating); i < 5; i ++) {
    ratingStars.push(<Stars key={i + 11} filled="0" />);
  }
  return ratingStars;
}

export default starRating;
