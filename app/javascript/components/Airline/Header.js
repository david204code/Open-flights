import React from 'react';

const Header = (props) => {
  return (
    <div className ="wrapper">
      <h1><img src = ""/> Airline Name</h1>
      <div className ="totalReviews"></div>
      <div className ="starRating"></div>
      <div className ="totalOutOf">3 out of 5</div>
    </div>
  )
}

export default Header;