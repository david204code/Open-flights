import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Airline from './Airline';
import styled from 'styled-components';

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const Header = styled.div`
  padding: 100px 100px 10px 100px;

  h1 {
    font-size: 42px;
  }
`

const Subheader = styled.div`
  font-weight: 300;
  font-size: 20px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
`

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

  // iterate and pass in data for the Airline component
  const grid = airlines.map( item => {
    return (
      <Airline 
        key ={item.attributes.name}
        attributes ={item.attributes}
      />
    )
  })

  return (
    <Home>
      <Header>
        <h1>OpenFlights</h1>
        <Subheader>Honest, unbiased airlines reviews.</Subheader>
      </Header>
      <Grid>
        {grid}
      </Grid>
    </Home>

  )
}

export default Airlines;