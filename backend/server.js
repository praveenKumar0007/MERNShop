import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

const app = express()

connectDB()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.use('/api/products', productRoutes)

app.listen(
  PORT,
  console.log(`Server Running in ${NODE_ENV} mode on ${PORT}`.yellow.bold)
)
