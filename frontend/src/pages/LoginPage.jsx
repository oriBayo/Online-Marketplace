import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/userSlice'
import { useLoginMutation } from '../features/usersApiSlice'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const dispatch = useDispatch()
  const { search } = useLocation()
  const redirect = new URLSearchParams(search).get('redirect')

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showEmailPlaceHolder, setShowEmailPlaceHolder] = useState(true)
  const [showPasswordPlaceHolder, setShowPasswordPlaceHolder] = useState(true)

  const navigate = useNavigate()
  const [login, { error, data: userInfo }] = useLoginMutation()

  useEffect(() => {
    if (userInfo) {
      if (redirect === 'shipping') {
        navigate('/shipping')
      } else {
        navigate('/products')
      }
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <FormContainer title={'login'} isLogin={true} withLogos={true}>
      <Form className='px-3' onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder={showEmailPlaceHolder ? 'Enter email' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setShowEmailPlaceHolder(false)}
            onBlur={() => setShowEmailPlaceHolder(email.length === 0)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder={showPasswordPlaceHolder ? 'Enter password' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowPasswordPlaceHolder(false)}
            onBlur={() => setShowPasswordPlaceHolder(password.length === 0)}
          />
        </Form.Group>
        {error && (
          <p className='text-danger fw-bold ms-3'>
            {error?.data?.message || error?.error}
          </p>
        )}
        <div className='mt-4 d-flex justify-content-center'>
          <Button
            type='submit'
            variant='light'
            className='border'
            style={{ width: '8rem' }}
          >
            Login
          </Button>
          <Button variant='dark' style={{ width: '8rem' }}>
            Cancel
          </Button>
        </div>
        <Row>
          <Col className='pt-5 text-center'>
            <div className='h5'>
              New Customer?
              <Link
                className='text-info ms-2 '
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginPage
