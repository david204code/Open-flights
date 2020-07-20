import React, { Fragment } from 'react';

const Airline = (props) => {
  return (
    <div className ="card">
      <div className ="airline-logo">
        <img src ={props.attribute.image_url} alt ={props.attribute.name}/>
      </div>
      <div className ="airline-name">{props.attribute.name}</div>
      <div className ="airline-score">{props.attribute.avg_score}</div>
      <div className ="airline-link">
        <a href ={`/airlines${props.attribute.slug}`}>View Airline</a>
      </div>
    </div>
  )
}

export default Airline;