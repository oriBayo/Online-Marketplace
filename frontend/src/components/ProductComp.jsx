import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RatingComp from './RatingComp'

const ProductComp = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded product-card'>
      <Link to={`/products/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          className='p-2 product-img'
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as='div'>
            <div className='my-3'>
              <RatingComp
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
          </Card.Text>
          <Card.Text as='h3'>${product.price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default ProductComp
