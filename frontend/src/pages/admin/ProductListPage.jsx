import {
  Button,
  Table,
  Row,
  Col,
  Offcanvas,
  Form,
  Container,
} from 'react-bootstrap'
import LoaderComp from '../../components/LoaderComp'
import { useGetProductsQuery } from '../../features/productsApiSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { useDeleteProductMutation } from '../../features/productsApiSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'
import {
  useCreateProductMutation,
  useUploadImageMutation,
} from '../../features/productsApiSlice'
import { useParams } from 'react-router-dom'
import PaginationComp from '../../components/PaginationComp'

const ProductListPage = () => {
  const { pageNum } = useParams()

  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { data, refetch, isLoading } = useGetProductsQuery({ pageNum })
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()

  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation()

  const deleteProductHandler = async (productId) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(productId).unwrap()
        refetch()
        toast.success('Product deleted')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const createProductHandler = async () => {
    try {
      await createProduct({
        price: parseFloat(price),
        name,
        brand,
        category,
        description,
        image,
        countInStock: parseInt(countInStock),
      }).unwrap()
      refetch()
      handleClose()
      toast.success('Product created')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
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
      <Offcanvas placement='end' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Create New Product</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Form>
              <Form.Group className='mb-1' controlId='name'>
                <Form.Label className='fw-bold text-black'>Name</Form.Label>
                <Form.Control
                  placeholder='Enter name'
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-1' controlId='price'>
                <Form.Label className='fw-bold text-black'>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='image' className='mb-1'>
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

              {loadingUpload && <LoaderComp />}

              <Form.Group className='mb-1' controlId='brand'>
                <Form.Label className='fw-bold text-black'>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-1' controlId='category'>
                <Form.Label className='fw-bold text-black'>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='description' className='mb-1'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Enter description'
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='countInStock' className='mb-1'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {loadingCreate ? (
                <LoaderComp />
              ) : (
                <div className='d-grid gap-1 mt-4'>
                  <Button onClick={createProductHandler}>Create product</Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </div>
              )}
            </Form>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>

      <Row className='mb-3'>
        <Col>
          <h1 className='text-start'>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button type='button' onClick={handleShow}>
            Create new product
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading ? (
            <LoaderComp />
          ) : (
            <Table hover responsive striped className='text-center table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/products/${product._id}`}>
                        <i className='fa-regular fa-pen-to-square icon fa-lg'></i>
                      </LinkContainer>
                    </td>
                    <td>
                      {loadingDelete ? (
                        <LoaderComp />
                      ) : (
                        <i
                          onClick={() => deleteProductHandler(product._id)}
                          className='fa-solid fa-trash icon fa-lg'
                        ></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <PaginationComp
            page={data?.page}
            pages={data?.pages}
            isAdmin={true}
          />
        </Col>
      </Row>
    </>
  )
}

export default ProductListPage
