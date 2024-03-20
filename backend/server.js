import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 5000

connectDB()

const app = express()
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('api is runing...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
)

app.use(notFound)
app.use(errorHandler)

app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
