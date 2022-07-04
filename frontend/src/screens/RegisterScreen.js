import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate(redirect)
      }, 2000)
    }
  }, [navigate, userInfo, redirect])
  const dispatch = useDispatch()
  const registerSubmitHandler = (e) => {
    e.preventDefault()
    setMessage(null)
    if (password === '') {
      setMessage('Password cannot be empty')
    } else if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message ? (
        <Message variant='danger' children={message} />
      ) : (
        error && <Message variant='danger' children={error} />
      )}

      {loading && <Loader />}
      {userInfo ? (
        <Message
          variant='success'
          children={`Hello ${userInfo.name}! Redirecting...`}
        />
      ) : (
        <>
          <Form onSubmit={registerSubmitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-4'>
              Register
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an Account ?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  )
}

export default RegisterScreen
