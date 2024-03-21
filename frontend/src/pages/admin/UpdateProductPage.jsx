import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../features/productsApiSlice'
import { useState, useEffect } from 'react'
import Loader from '../../components/LoaderComp'
import MessageComp from '../../components/MessageComp'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UpdateProductPage = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId)

  const [updateProduct, { isLoading: loadingUpdate, error: errorUpdate }] =
    useUpdateProductMutation()

  useEffect(() => {
    if (!isLoading) {
      setName(product.name)
      setPrice(product.price)
      setBrand(product.brand)
      setDescription(product.description)
      setCategory(product.category)
      setCountInStock(product.countInStock)
    }
  }, [isLoading, product])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({
      _id: product._id,
      name,
      price,
      category,
      description,
      brand,
      countInStock,
    })
    try {
      await updateProduct({
        _id: product._id,
        name,
        price,
        category,
        description,
        brand,
        countInStock,
      }).unwrap()
      refetch()
      toast.success('Product Updated seccessfuly')
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      <h1 className='m-3'>Update Product</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <MessageComp variant='danger'>
          {error?.data?.message || error.error}
        </MessageComp>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name' className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price' className='mb-2'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='brand' className='mb-2'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category' className='mb-2'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description' className='mb-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock' className='mb-2'>
            <Form.Label>CountInStock</Form.Label>
            <Form.Control
              type='number'
              value={countInStock}
              onChange={(e) => setCountInStock(parseInt(e.target.value))}
            ></Form.Control>
          </Form.Group>
          {loadingUpdate ? (
            <Loader />
          ) : (
            errorUpdate && (
              <MessageComp variant='danger'>
                {errorUpdate?.data?.message || errorUpdate?.error}
              </MessageComp>
            )
          )}

          <div className='mt-3'>
            <Button type='submit' className='me-3'>
              Update
            </Button>
            <Button onClick={() => navigate('/admin/productlist')}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </>
  )
}

export default UpdateProductPage
