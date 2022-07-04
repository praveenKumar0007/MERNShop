import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      setTimeout(() => {
        navigate('/login?redirect=/profile')
      }, 2000)
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, user, userInfo, navigate])
  const userDetailsUpdateHandler = (e) => {
    e.preventDefault()
    setMessage(null)
    if (password !== '' && password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  return (
    <>
      {!userInfo ? (
        <Message
          variant='success'
          children='You need to login to access this page! Redirecting...'
        />
      ) : (
        <Row>
          <Col md={3}>
            <h2>User Details</h2>
            {message ? (
              <Message variant='danger' children={message} />
            ) : success ? (
              <Message variant='success'>Profile Updated!</Message>
            ) : (
              error && <Message variant='danger' children={error} />
            )}

            {loading && <Loader />}
            <Form onSubmit={userDetailsUpdateHandler}>
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
                Update Profile
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h2>My Orders</h2>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProfileScreen
