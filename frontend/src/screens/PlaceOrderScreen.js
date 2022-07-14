import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { CREATE_ORDER_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: CREATE_ORDER_RESET })
    }

    //eslint-disable-next-line
  }, [success, navigate, dispatch, order])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    )
  )

  cart.shippingPrice = addDecimals((cart.itemsPrice * 0.1).toFixed(2))
  cart.taxPrice = addDecimals(Number(cart.itemsPrice * (0.15).toFixed(2)))

  cart.totalPrice = addDecimals(
    (
      Number(cart.itemsPrice) +
      Number(cart.taxPrice) +
      Number(cart.itemsPrice > 1000 ? 0 : cart.shippingPrice)
    ).toFixed(2)
  )
  return (
    <>
      <CheckoutSteps signIn shipping paymentMethod placeOrder />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, 
                ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Order Items</strong>
              {cart.cartItems.length === 0 ? (
                <Message variant='danger' children='Your Cart is Empty' />
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} ={' '}
                          <strong>${(item.qty * item.price).toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  {cart.itemsPrice > 1000 ? (
                    <>
                      <Col>
                        <s>Shipping</s>
                      </Col>
                      <Col style={{ color: '#d4a537' }}>Free Shipping </Col>
                    </>
                  ) : (
                    <>
                      <Col>Shipping</Col>
                      <Col>${cart.shippingPrice}</Col>
                    </>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
