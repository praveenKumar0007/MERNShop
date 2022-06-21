import express from 'express'
import Product from '../model/productSchema'

const productRoutes = express.Router()

productRoutes.get('/', async (req, res) => {
  const products = await Product.find({})
})

productRoutes.get('/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

export default productRoutes
