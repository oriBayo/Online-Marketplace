import { useGetProductsQuery } from '../features/productsApiSlice'
import { Row, Col } from 'react-bootstrap'
import ProductComp from '../components/ProductComp'
import Message from '../components/MessageComp'
import Loader from '../components/LoaderComp'
import { useParams } from 'react-router-dom'
import PaginationComp from '../components/PaginationComp'
import { useSelector } from 'react-redux'
import BackBtnComp from '../components/BackBtnComp'

const ProductsPage = () => {
  const { pageNum, keyword } = useParams()
  const { data, isLoading, isError } = useGetProductsQuery({ pageNum, keyword })
  const userInfo = useSelector((state) => state.users.userInfo)

  return (
    <>
      {keyword && <BackBtnComp url={'/products'} />}
      <h1 className='text-capitalize text-center'>
        Our <strong className='banner-title'>Products</strong>
      </h1>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {isError?.data?.message || isError?.error}
        </Message>
      ) : (
        <>
          <Row>
            {data.products.map((product) => (
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
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default ProductsPage
