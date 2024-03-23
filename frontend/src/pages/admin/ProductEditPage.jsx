import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from '../../features/productsApiSlice'
import { useState, useEffect } from 'react'
import Loader from '../../components/LoaderComp'
import MessageComp from '../../components/MessageComp'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ProductEditPage = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState('')

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId)

  const [updateProduct, { isLoading: loadingUpdate, error: errorUpdate }] =
    useUpdateProductMutation()

  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setBrand(product.brand)
      setDescription(product.description)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setImage(product.image)
    }
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProduct({
        productId,
        name,
        price,
        category,
        description,
        brand,
        image,
        countInStock,
      }).unwrap()
      refetch()
      toast.success('Product Updated seccessfuly')
    } catch (error) {
      toast.error(error)
    }
  }

  const uploadImageHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
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

          <Form.Group controlId='image' className='mb-2'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              className='mb-1'
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='file'
              label='Choose file'
              onChange={uploadImageHandler}
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
              rows={2}
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

export default ProductEditPage
