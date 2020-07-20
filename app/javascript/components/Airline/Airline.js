import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const Airline = (props) => {
  // Object, set initial set to empty object
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})

  useEffect(() => {
    // api/v1/airlines/:slug
    // need to get the :slug value for React, 
    // get that value from URL
    const slug = props.match.params.slug
    const url = `/api/v1/airlines/${slug}`
    console.log(props);

    axios.get(url)
    .then( resp => setAirline(resp.data) )
    .catch( resp => console.log(resp) )

    // pass in an empty argument/array so it only runs once
  }, [])

  return (
    <div className ="wrapper">
      <div className ="column">
        <div className ="header"></div>
        <div className ="reviews"></div>
      </div>
      <div className ="column">
        <div className ="review-form">[Review form goes here.]</div>
      </div>
    </div>
  )
}

export default Airline;