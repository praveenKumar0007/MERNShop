import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

connectDB()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(
  PORT,
  console.log(`Server Running in ${NODE_ENV} mode on ${PORT}`.yellow.bold)
)
