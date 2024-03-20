import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../features/cartSlice'
import CheckOutStepsComp from '../components/CheckOutStepsComp'
import { useNavigate } from 'react-router-dom'

const ShippingPage = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress)
  
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }
  return (
    <Container className='w-50'>
      <Row className='justify-content-md-center'>
        <Col>
          <CheckOutStepsComp step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
              <Form.Label className='mb-2'>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label className='m-2'>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='postalCode'>
              <Form.Label className='m-2'>Postal code</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postal Code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='country'>
              <Form.Label className='m-2'>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Button className='my-3' type='submit' variant='dark'>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingPage
