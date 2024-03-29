import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../features/usersApiSlice'
import Loader from '../../components/LoaderComp'
import MessageComp from '../../components/MessageComp'
import { toast } from 'react-toastify'

const UserEditPage = () => {
  const { id: userId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const {
    data: user,
    refetch,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userId)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      updateUser({ userId, name, email, isAdmin }).unwrap()
      refetch()
      toast.success('User updated successfully')
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  return (
    <>
      <h1 className='m-3'>Update User</h1>
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

          <Form.Group controlId='email' className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='isAdmin' className='my-4'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          {loadingUpdate && <Loader />}

          <div className='mt-3'>
            <Button type='submit' className='me-3'>
              Update
            </Button>
            <Button onClick={() => navigate('/admin/userlist')}>Cancel</Button>
          </div>
        </Form>
      )}
    </>
  )
}

export default UserEditPage
