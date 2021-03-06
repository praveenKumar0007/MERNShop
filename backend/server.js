import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import path from 'path'

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoutes)

app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound) // Learn more on middleware

app.use(errorHandler) // Learn more on middleware

app.listen(
  PORT,
  console.log(`Server Running in ${NODE_ENV} mode on ${PORT}`.yellow.bold)
)
