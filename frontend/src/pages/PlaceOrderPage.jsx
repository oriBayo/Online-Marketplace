import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Card,
} from 'react-bootstrap'
import CheckOutStaepsComp from '../components/CheckOutStepsComp'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import MessageComp from '../components/MessageComp'
import LoaderComp from '../components/LoaderComp'
import { useCreateOrderMutation } from '../features/orderApiSlice'
import {clearCartItems} from '../features/cartSlice'

const PlaceOrderPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
 
  const [createOrder, { isLoading, error }] =
    useCreateOrderMutation()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    }else if(!cart.paymentMethod){
      navigate('payment')
    }
  },[cart.shippingAddress.address, cart.paymentMethod , navigate])

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice : cart.itemsPrice,
        shippingPrice : cart.shippingPrice,
        taxPrice : cart.taxPrice,
        totalPrice : cart.totalPrice,
      }).unwrap()  
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
    } catch (error) {
      console.error(error)
    }
  
  }
  return (
    <Container>
      <Row>
        <CheckOutStaepsComp step1 step2 step3 step4 />
        {isLoading ? (
          <LoaderComp />
        ) : (
          <>
            <Col className='me-5' md={7}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong className='fw-bold'>Address: </strong>
                    {cart.shippingAddress.address},{cart.shippingAddress.city}
                    {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong className='fw-bold'>Method: </strong>
                    {cart.paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => {
                      return (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    })}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${cart.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${cart.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && (
                      <MessageComp variant='danger'>{error}</MessageComp>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className='d-grid gap-1'>
                      <Button
                        className='btn-block'
                        type='button'
                        variant='dark'
                        disabled={cart.cartItems.length === 0}
                        onClick={placeOrderHandler}
                      >
                        Place Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  )
}

export default PlaceOrderPage
