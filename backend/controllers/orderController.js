import asyncHandler from 'express-async-handler'
import Order from '../model/orderSchema.js'

// @desc      Create new order
// @route     POST /api/orders
// @access    Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMehtod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Order Items!')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMehtod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = order.save()
    res.status(201).json(createdOrder)
  }
})

export { addOrderItems }
