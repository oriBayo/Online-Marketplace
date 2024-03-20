import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './LoaderComp'
import { useProfileMutation } from '../features/usersApiSlice'
import { setCredentials } from '../features/userSlice'
import { toast } from 'react-toastify'

const ProfileFormComp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  })

  const inputHandler = (e) => {
    const fieldName = e.target.name
    const value = e.target.value
    setUserData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const { userInfo } = useSelector((state) => state.users)
  const [updateProfile, { isLoading }] = useProfileMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const updatedProfile = await updateProfile({ ...userData }).unwrap()

      dispatch(setCredentials({ ...updatedProfile }))
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  useEffect(() => {
    if (userInfo) {
      setUserData((prev) => ({
        ...prev,
        name: userInfo.name,
        email: userInfo.email,
      }))
    } else {
      navigate('/')
    }
  }, [navigate, userInfo, userInfo.name, userInfo.email])

  return (
    <Form onSubmit={submitHandler} className='  mx-auto'>
      <Form.Group className='mb-3' controlId='name'>
        <Form.Label className='fw-bold text-black'>Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          value={userData.name}
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='email'>
        <Form.Label className='fw-bold text-black'>Email</Form.Label>
        <Form.Control
          type='text'
          name='email'
          value={userData.email}
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='oldPassword'>
        <Form.Label className='fw-bold text-black'>Old Password</Form.Label>
        <Form.Control
          type='password'
          name='oldPassword'
          value={userData.oldPassword}
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='newPassword'>
        <Form.Label className='fw-bold text-black'>New Password</Form.Label>
        <Form.Control
          type='password'
          name='newPassword'
          value={userData.newPassword}
          onChange={inputHandler}
        />
      </Form.Group>
      <div className=' d-grid w-75 m-auto'>
        <Button type='submit' className='border' variant='light'>
          Update
        </Button>
        <Button variant='dark'>Cancle</Button>
      </div>
      {isLoading && <Loader />}
    </Form>
  )
}

export default ProfileFormComp
