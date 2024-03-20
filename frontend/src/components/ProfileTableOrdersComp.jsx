import { useGetMyOrdersQuery } from '../features/orderApiSlice'
import Loader from './LoaderComp'
import Message from '../components/MessageComp'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileTableOrdersComp = () => {
  const { data: orders, error, isLoading } = useGetMyOrdersQuery()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover responsive className='table-sm text-center '>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELEIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fa-solid fa-xmark text-danger'></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.delivered.substring(0, 10)
                  ) : (
                    <i className='fa-solid fa-xmark text-danger'></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='dark'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default ProfileTableOrdersComp
