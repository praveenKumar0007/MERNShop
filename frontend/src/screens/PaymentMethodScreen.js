import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentMethodScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (Object.keys(shippingAddress).length === 0) {
      setMessage('No Shipping Address Found! Redirecting...')
      setTimeout(() => {
        navigate('/shipping')
      }, 1500)
    }
  }, [setMessage, shippingAddress, navigate])

  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('')

  const paymentMethodSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <h1>Payment Method</h1>
      <CheckoutSteps signIn shipping paymentMethod />
      {message && <Message variant='danger' children={message} />}
      <Form onSubmit={paymentMethodSubmitHandler}>
        <Form.Group>
          <Form.Label as='legend' className='mb-3'>
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='paypal'
              name='paymentMethod'
              value='PayPal'
              onChange={(e) => setPaymentMethod(e.target.value)}
              className='mb-2'
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='stripe'
              name='paymentMethod'
              value='Stripe'
              className='mb-2'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-4'>
          Save Payment Method
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethodScreen
