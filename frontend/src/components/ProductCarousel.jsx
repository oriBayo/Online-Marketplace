import React from 'react'
import { useGetTopProductsQuery } from '../features/productsApiSlice'
import Message from '../components/MessageComp'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery()

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='my-5 '>
      {products.map((product) => (
        <Carousel.Item key={product._id} className='c-item'>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} className='c-img' />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
export default ProductCarousel
