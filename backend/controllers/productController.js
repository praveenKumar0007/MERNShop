import Product from '../model/productSchema.js'
import asyncHandler from 'express-async-handler'

// @desc      Fetch all products
// @route     GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc      Fetch one products
// @route     GET /api/products/:id
// @access    Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc      Delete product by Id
// @route     DELETE /api/products/:id
// @access    Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product Deleted', deletedProductName: product.name })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc      Create a product
// @route     POST /api/products
// @access    Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc      Update a product by Id
// @route     PUT /api/products/:id
// @access    Private/Admin
const updateProductById = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product Not Found!')
  }
})

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
}
