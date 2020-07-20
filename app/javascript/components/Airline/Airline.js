import React, { useState, useEffect } from 'react';

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
    // pass in an empty argument/array so it only runs once
  }, [])

  return <div>This is the Airlines#show view for our app</div>
}

export default Airline;