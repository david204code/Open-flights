import React from 'react';

const Header = (props) => {
  // object destructuring to set all the values
  // getting the values(name) from props.attributes, those value can now be use inside the component
  const {name, image_url, avg_score} = props.attributes
  // get the number of reviews for that airline
  const total = props.reviews.length
  return (
    <div className ="wrapper">
      <h1><img src = {image_url} alt ={name}/> {name}</h1>
      <div className ="totalReviews">{total} User Reviews</div>
      <div className ="starRating"></div>
      <div className ="totalOutOf">{avg_score} out of 5</div>
    </div>
  )
}

export default Header;