import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

  const { id } = useParams()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  const dispatch = useDispatch()

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      setMessage(`Updated ${user.name}`)
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id))
      } else {
        setEmail(user.email)
        setName(user.name)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, dispatch, id, successUpdate])
  useEffect(() => {})
  const editUserSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: id,
        name,
        email,
        isAdmin,
      })
    )
  }
  return (
    <>
      <Link
        to='/admin/userList'
        className='btn btn-light my-3'
        onClick={() => {
          dispatch({ type: USER_UPDATE_RESET })
        }}
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate ? (
          <Loader />
        ) : errorUpdate ? (
          <Message variant='danger'>{errorUpdate}</Message>
        ) : (
          message && <Message variant='success'>{message}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger' children={error} />
        ) : (
          <Form onSubmit={editUserSubmitHandler}>
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
            <Form.Group controlId='isadmin' className='mt-3'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-4'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
