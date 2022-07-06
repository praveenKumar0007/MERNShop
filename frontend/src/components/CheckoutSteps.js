import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ signIn, shipping, paymentMethod, placeOrder }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {signIn ? (
          <LinkContainer to='/login'>
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {shipping ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {paymentMethod ? (
          <LinkContainer to='payment'>
            <Nav.Link>Payment Method</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment Method</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {placeOrder ? (
          <LinkContainer to='/orders'>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
