import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../features/cartSlice'
import MessageComp from '../components/MessageComp'
import BackBtnComp from '../components/BackBtnComp'

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.users.userInfo)

  const updateQtyHandler = (e, product) => {
    dispatch(addToCart({ ...product, qty: Number(e.target.value) }))
  }

  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product._id))
  }

  const checkoutHandler = () => {
    if (user) {
      navigate('/shipping')
    } else {
      navigate('/login?redirect=shipping')
    }
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div className='d-flex align-items-center my-4'>
            <BackBtnComp url={'/products'} />
            <h1 className='ms-5'>Shopping Cart</h1>
          </div>
          {cartItems.length === 0 ? (
            <MessageComp>
              Your cart is empty <Link to='/products'>Go Back</Link>
            </MessageComp>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className='p-4 ps-0'>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        className='custom-link'
                        to={`/products/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Select
                        value={item.qty}
                        onChange={(e) => updateQtyHandler(e, item)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item)}
                      >
                        <i className='fa-solid fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((sum, val) => val.qty + sum, 0)})
                  items
                </h2>
                Total price: $
                {cartItems
                  .reduce((sum, item) => sum + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid'>
                  <Button
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartPage
