import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Header from './Header';
import styled from 'styled-components';
import ReviewForm from './ReviewForm';

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
  padding-left: 50px;
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

  const handleChange = (e) => {
    e.preventDefault()
    
    // Used state hook so can update review and state
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
    console.log('review: ', review)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // update the default headers with axios and pull in csrfToken
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const airline_id  = airline.data.id
    // In between are the payload {}, review(object), airline_id
    axios.post('/api/v1/reviews', {review, airline_id})
    .then(resp => {
      // debugger
      // updating the state of the app to get the latest review
      // by pushing the latest review into arrays of reviews
      const included = [...airline.included, resp.data.data]
      setAirline({...airline, included})
      // Clear out the form values after submition
      setReview({title: '', description: '', score: 0})
    })
    .catch(resp => {})
  }

  const setRating = (score, e) => {
    e.preventDefault()
    // debugger

    // use the useState hook for set review + spread operator
    setReview({...review, score})
  }

  return (
    <Wrapper>
      { 
      // check that the data is loaded
        loaded && 
        <Fragment>
          <Coloumn>
            <Main>
              <Header
              // passing data to the Header components
              attributes ={airline.data.attributes}
              reviews ={airline.included}
              />
              <div className ="reviews"></div>
            </Main>
          </Coloumn>
          <Coloumn>
            <ReviewForm
              handleChange ={handleChange}
              handleSubmit ={handleSubmit}
              setRating ={setRating}
              attributes ={airline.data.attributes}
              review ={review}
            />
          </Coloumn>          
        </Fragment>
      } 
    </Wrapper>
  )
}

export default Airline;