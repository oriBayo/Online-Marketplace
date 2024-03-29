import { useGetProductsQuery } from '../features/productsApiSlice'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductComp from '../components/ProductComp'
import SearchComp from '../components/SearchComp'
import Message from '../components/MessageComp'
import Loader from '../components/LoaderComp'
import { useParams } from 'react-router-dom'
import PaginationComp from '../components/PaginationComp'
import { useSelector } from 'react-redux'

const ProductsPage = () => {
  const { pageNum } = useParams()

  const [productToSearch, setProductToSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  const { data, isLoading, isError } = useGetProductsQuery({ pageNum })

  const userInfo = useSelector((state) => state.users.userInfo)

  useEffect(() => {
    if (!isLoading) {
      setFilteredProducts(
        data.products.filter((product) =>
          product.name.toLowerCase().includes(productToSearch.toLowerCase())
        )
      )
    }
  }, [data, productToSearch, isLoading])

  return (
    <>
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
        <>
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

          <PaginationComp
            pages={data.pages}
            page={data.page}
            isAdmin={userInfo?.isAdmin}
          />
        </>
      )}
    </>
  )
}

export default ProductsPage
