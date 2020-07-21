import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const Coloumn = styled.div`
  background: #fff;
  height: 100vh;
  // overflow: scroll;

  &: last-child {
    background: #000;
  }
`

const Main = styled.div`
  left-padding: 50px;
`



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
    <Wrapper>
      <Coloumn>
        <Main>
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
        </Main>
      </Coloumn>
      <Coloumn>
        <div className ="review-form">[Review form goes here.]</div>
      </Coloumn>
    </Wrapper>
  )
}

export default Airline;