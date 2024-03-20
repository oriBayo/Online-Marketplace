import { useGetProductsQuery } from '../features/productsApiSlice'
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductComp from '../components/ProductComp'
import SearchComp from '../components/SearchComp'
import Message from '../components/MessageComp'
import Loader from '../components/LoaderComp'
import { useEffect } from 'react'

const ProductsPage = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery()

  const [productToSearch, setProductToSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (!isLoading) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(productToSearch.toLowerCase())
        )
      )
    }
  }, [products, productToSearch, isLoading])

  return (
    <section className='' id='products'>
      <h1 className='text-capitalize text-center'>
        Our <strong className='banner-title'>Products</strong>
      </h1>
      <SearchComp
        productToSearch={productToSearch}
        setProductToSearch={setProductToSearch}
      />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {isError?.data?.message || isError?.error}
        </Message>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col
              key={product._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              id={product._id}
            >
              <ProductComp product={product} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}

export default ProductsPage
