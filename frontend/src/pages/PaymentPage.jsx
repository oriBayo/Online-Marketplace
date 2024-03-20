import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import CheckOutStepsComp from '../components/CheckOutStepsComp'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../features/cartSlice'

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const shippingAddress = useSelector((state) => state.cart.shippingAddress)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])
  

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return (
    <Container className='w-50'>
      <Row className='justify-content-md-center'>
        <Col>
          <CheckOutStepsComp step1 step2 step3 />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>

              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>

                <Form.Check
                  type='radio'
                  label='Stripe'
                  id='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
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

export default PaymentPage
