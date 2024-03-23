import { Table, Row, Col } from 'react-bootstrap'
import LoaderComp from '../../components/LoaderComp'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../features/usersApiSlice'

const UsersListPage = () => {
  const { data: users, refetch, isLoading } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser(userId).unwrap()
      refetch()
      toast.success('User deletes successfuly')
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  return (
    <>
      <Row className='align-items-center text-center m-4'>
        <Col>
          <h1 className='text-start'>Users</h1>
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
                  <th>EMAIL</th>
                  <th>IS ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          style={{ color: 'green' }}
                          className='fa-solid fa-check fa-lg'
                        ></i>
                      ) : (
                        <i
                          style={{ color: 'red' }}
                          className='fa-solid fa-xmark fa-lg'
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/users/${user._id}`}>
                        <i className='fa-regular fa-pen-to-square icon fa-lg'></i>
                      </LinkContainer>
                    </td>
                    <td>
                      {loadingDelete ? (
                        <LoaderComp />
                      ) : (
                        <i
                          onClick={() => deleteUserHandler(user._id)}
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

export default UsersListPage
