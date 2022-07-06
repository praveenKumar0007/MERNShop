import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/'
  console.log(redirect)
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate(redirect)
      }, 1000)
    }
  }, [navigate, userInfo, redirect])
  const dispatch = useDispatch()
  const loginSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger' children={error} />}
      {loading && <Loader />}
      {userInfo ? (
        <Message
          variant='success'
          children={`Hello ${userInfo.name}! Redirecting...`}
        />
      ) : (
        <>
          <Form onSubmit={loginSubmitHandler}>
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
            <Button type='submit' variant='primary' className='my-3'>
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer ?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  )
}

export default LoginScreen
