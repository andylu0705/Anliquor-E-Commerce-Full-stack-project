import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


//allow to accpet JSON data in the body
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('API is running...')
})

//==>MongoDB ==> Cotroller ==> Routes ==> server
app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
//use error middleware to customize error message
app.use(notFound)
app.use(errorHandler)

//connect to Port 5000
const PORT= process.env.PORT || 5000
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
