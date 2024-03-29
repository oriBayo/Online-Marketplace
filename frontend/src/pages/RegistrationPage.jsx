import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { cleanError, addError, setCredentials } from '../features/userSlice'
import FormContainer from '../components/FormContainer'
import { logicNames } from '../constants/stringConstant'
import '../styles/login.css'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../features/usersApiSlice'

const RegistrationPage = () => {
  const [placeholders, setPlaceholders] = useState({
    fullName: true,
    email: true,
    password: true,
    confirmPassword: true,
  })
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const [register, { error, data: userInfo }] = useRegisterMutation()

  const inputRefs = {
    fullName: useRef(),
    email: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
  }

  const handlePlaceholderChange = (inputName) => {
    setPlaceholders((prevPlaceholders) => ({
      ...prevPlaceholders,
      [inputName]: inputRefs[inputName].current.value.length === 0,
    }))
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, navigate, userInfo])

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const { fullName, email, password, confirmPassword } = inputRefs
    const fullNameValue = fullName.current.value
    const emailValue = email.current.value
    const passwordValue = password.current.value
    const confirmPasswordValue = confirmPassword.current.value

    try {
      if (passwordValue === confirmPasswordValue) {
        const res = await register({
          name: fullNameValue,
          email: emailValue,
          password: passwordValue,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
      } else {
        dispatch(addError('Password do not match'))
      }

      setTimeout(() => {
        dispatch(cleanError())
      }, 3000)
    } catch (error) {}
  }
  const handleFocus = (inputName) => {
    setPlaceholders((prevPlaceholders) => ({
      ...prevPlaceholders,
      [inputName]: false,
    }))
  }

  const handleBlur = (inputName) => {
    handlePlaceholderChange(inputName)
  }
  return (
    <FormContainer title={'register'} withLogos={true}>
      <Form className='px-3 text-capitalize' onSubmit={handleFormSubmit}>
        {['fullName', 'email', 'password', 'confirmPassword'].map(
          (inputName) => (
            <Form.Group key={inputName} className='mb-1' controlId={inputName}>
              <Form.Label>
                {logicNames[inputName] === 'confirmPassword'
                  ? 'confirm password'
                  : logicNames[inputName]}
              </Form.Label>
              <Form.Control
                ref={inputRefs[inputName]}
                type={
                  inputName === 'password' || inputName === 'confirmPassword'
                    ? 'password'
                    : 'text'
                }
                placeholder={
                  placeholders[inputName]
                    ? logicNames[inputName] === 'confirmPassword'
                      ? 'Confirm Password'
                      : `Enter ${logicNames[inputName]}`
                    : ''
                }
                onFocus={() => handleFocus(inputName)}
                onBlur={() => handleBlur(inputName)}
              />
            </Form.Group>
          )
        )}
        {error !== '' && <p className='text-danger fw-bold ms-3'>{error}</p>}
        <div className='d-flex m-3 justify-content-center'>
          <Button
            type='submit'
            variant='light'
            className='border'
            style={{ width: '8rem' }}
          >
            Register
          </Button>
          <Button
            variant='dark'
            style={{ width: '8rem' }}
            onClick={() => navigate('/login')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default RegistrationPage
