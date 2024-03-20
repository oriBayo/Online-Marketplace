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
import { useCreateProductMutation } from '../../features/productsApiSlice'

const ProductListPage = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { data: products, refetch, isLoading } = useGetProductsQuery()
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()

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
      await createProduct({ price, name, brand, category }).unwrap()
      refetch()
      handleClose()
      toast.success('Product created')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
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
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label className='fw-bold text-black'>Name</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='price'>
                <Form.Label className='fw-bold text-black'>Price</Form.Label>
                <Form.Control
                  type='number'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='category'>
                <Form.Label className='fw-bold text-black'>Category</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='brand'>
                <Form.Label className='fw-bold text-black'>Brand</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>

              {loadingCreate ? (
                <LoaderComp />
              ) : (
                <div className='d-grid gap-1'>
                  <Button onClick={createProductHandler}>Create product</Button>
                  <Button onClick={handleClose}>Cancle</Button>
                </div>
              )}
            </Form>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>

      <Row className='align-items-center text-center m-4'>
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
            <Table hover responsive striped className='text-center'>
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
                {products.map((product) => (
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
        </Col>
      </Row>
    </>
  )
}

export default ProductListPage
