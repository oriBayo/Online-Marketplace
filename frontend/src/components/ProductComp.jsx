import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RatingComp from './RatingComp'

const ProductComp = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body
        style={{ minHeight: '320px' }}
        className='d-flex align-items-center justify-content-center'
      >
        <Link to={`/products/${product._id}`}>
          <Card.Img src={product.image} variant='top' fluid />
        </Link>
      </Card.Body>
      <Card.Footer style={{ minHeight: '150px' }}>
        <Link to={`/products/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            <RatingComp
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Footer>
    </Card>
  )
}

export default ProductComp
