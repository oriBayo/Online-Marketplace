import { Button, Table } from 'react-bootstrap'
import LoaderComp from '../../components/LoaderComp'
import MessageComp from '../../components/MessageComp'
import { useGetOrdersQuery } from '../../features/orderApiSlice'
import { LinkContainer } from 'react-router-bootstrap'

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()
  return (
    <>
      {isLoading ? (
        <LoaderComp />
      ) : error ? (
        <MessageComp variant='danger'>
          {error?.data?.message || error.error}
        </MessageComp>
      ) : (
        <Table className='text-center' striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.paidAt ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fa-solid fa-xmark text-danger'></i>
                  )}
                </td>
                <td>
                  {order.deliveredAt ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fa-solid fa-xmark text-danger'></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn btn-sm'>Detailes</Button>
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

export default OrderListPage
