import { useGetTopProductsQuery } from '../features/productsApiSlice'
import Message from '../components/MessageComp'
import { Carousel, Image, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/RatingComp'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery()

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='my-5' style={{ position: 'relative' }}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} />
              </Col>
              <Col md={6} className='p-4 '>
                <h2 className='mb-3 text-capitalize'>{product.name}</h2>
                <p className='me-5 text-lowercase lead '>
                  {product.description}
                </p>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </Col>
            </Row>
          </Link>
          <Carousel.Caption
            className='d-flex justify-content-center align-items-center  '
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
            }}
          >
            <h2 className='text-white text-right p-1 w-100'>
              {product.name} (${product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
export default ProductCarousel
