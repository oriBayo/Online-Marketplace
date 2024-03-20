import { useState } from 'react'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
} from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'

import RatingComp from '../components/RatingComp'
import LoaderComp from '../components/LoaderComp'
import MessageComp from '../components/MessageComp'
import { useGetProductDetailsQuery } from '../features/productsApiSlice'
import { addToCart } from '../features/cartSlice'
import { useDispatch } from 'react-redux'

const ProductPage = () => {
  const { id: productId } = useParams()

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId)

  const [qty, setQty] = useState(1)

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }
  return (
    <>
      {isLoading ? (
        <LoaderComp />
      ) : isError ? (
        <MessageComp variant='danger'>
          {isError?.data.message || isError?.error}
        </MessageComp>
      ) : (
        <section className='productPage m-2'>
          <Container>
            <Link className='btn btn-light my-3 border' to={'/products'}>
              Go Back
            </Link>
            <Row className='d-flex justify-content-center'>
              <Col lg={4} className='mb-3'>
                <Row>
                  <Image src={product.image} alt={product.name} fluid />
                </Row>
                <Row className='my-3'>
                  <Col className='img-carousel'>
                    <Image src={product.image} alt={product.name} fluid />
                  </Col>
                  <Col className='img-carousel'>
                    <Image src={product.image} alt={product.name} fluid />
                  </Col>
                  <Col className='img-carousel'>
                    <Image src={product.image} alt={product.name} fluid />
                  </Col>
                </Row>
              </Col>
              <Col lg={4} className='px-4'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <RatingComp
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item className='my-3'>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col lg={4} className='mb-5'>
                <Card className='p-2'>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <span className='fw-bold'>${product.price}</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <span className='fw-bold'>
                            {product.countInStock > 0
                              ? 'In Stock'
                              : 'Out Of Stock'}
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row className='d-flex align-items-center'>
                        <Col>Quantity:</Col>
                        <Col>
                          <ListGroup horizontal={true}>
                            <ListGroup.Item
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                setQty(() => (qty >= 1 ? qty - 1 : 0))
                              }
                            >
                              -
                            </ListGroup.Item>
                            <ListGroup.Item>{qty}</ListGroup.Item>
                            <ListGroup.Item
                              disabled={qty >= product.countInStock}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setQty(() => qty + 1)}
                            >
                              +
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                        <Col className='text-center'>
                          ${(product.price * qty).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex justify-content-center mt-2'>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock <= 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                      <Button
                        className='btn-block ms-3'
                        type='button'
                        variant='danger'
                        disabled={product.countInStock <= 0}
                      >
                        Buy Now
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  )
}

export default ProductPage
