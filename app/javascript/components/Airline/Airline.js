import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const Airline = (props) => {
  // Object, set initial set to empty object
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  // ensure the state is set before accessing/using the data
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // api/v1/airlines/:slug
    // need to get the :slug value for React, 
    // get that value from URL
    const slug = props.match.params.slug
    const url = `/api/v1/airlines/${slug}`
    console.log(props);

    axios.get(url)
    .then( resp => {
      setAirline(resp.data)
      setLoaded(true) 
    })
    .catch( resp => console.log(resp) )

    // pass in an empty argument/array so it only runs once
  }, [])

  return (
    <div className ="wrapper">
      <div className ="column">
        { 
        // check that the data is loaded
          loaded && 
          <Header
          // passing data to the Header components
            attributes ={airline.data.attributes}
            reviews ={airline.included}
          />
        } 
        <div className ="reviews"></div>
      </div>
      <div className ="column">
        <div className ="review-form">[Review form goes here.]</div>
      </div>
    </div>
  )
}

export default Airline;