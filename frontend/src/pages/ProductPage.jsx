import { useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'

import RatingComp from '../components/RatingComp'
import LoaderComp from '../components/LoaderComp'
import MessageComp from '../components/MessageComp'
import { useGetProductDetailsQuery } from '../features/productsApiSlice'
import { addToCart } from '../features/cartSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useCreateProductReviewMutation } from '../features/productsApiSlice'
import { useSelector } from 'react-redux'

const ProductPage = () => {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const userInfo = useSelector((state) => state.users.userInfo)

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductDetailsQuery(productId)

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  const [createReview, { isLoading: loadingCreateReview }] =
    useCreateProductReviewMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await createReview({
        productId,
        comment,
        rating,
      }).unwrap()
      refetch()
      toast.success('Review created successfully')
      setComment('')
      setRating(0)
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
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
        <>
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
          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <MessageComp>No Reviews</MessageComp>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review.name}>
                    <strong>{review.name}</strong>
                    <RatingComp value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {loadingCreateReview && <LoaderComp />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating' className='my-2'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' disabled={loadingCreateReview}>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <MessageComp>
                      Please <Link to='/login'>Sign in</Link> to write a review
                    </MessageComp>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductPage
