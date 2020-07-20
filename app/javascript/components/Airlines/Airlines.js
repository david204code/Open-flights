import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Airline from './Airline';

const Airlines = () => {
  const [airlines, setAirlines] = useState([])

  useEffect(() => {
    //Get all airlines from api
    //update airlines in our state
    axios.get('/api/v1/airlines.json')
    .then( resp => {
      setAirlines(resp.data.data)
    })
    .catch( resp => console.log(resp) )
    // useEffect means a list of items needs to be pass in
    // so the effect will only fires when the value changes
  }, [airlines.length])

  const list = airlines.map( item => {
    return (<li key={item.attributes.name}>{item.attributes.name}</li>)
  })

  return (
    <div className ="home">
      <div className ="header">
        <h1>OpenFlights</h1>
        <div className ="subheader">Honest, unbiased airlines reviews.</div>
      </div>
      <div className ="grid">
        <ul>{list}</ul>
      </div>
    </div>

  )
}

export default Airlines;