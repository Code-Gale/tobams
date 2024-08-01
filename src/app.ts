import express from 'express';
import { errorHandler } from './middlewares/errorMiddleware';
import connectDB from './config/db'
import bookRoutes from './routes/bookRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

connectDB()

//middlewares
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api', bookRoutes)
app.use(errorHandler)

const server = app.listen(port, async () => {
    await connectDB();
    console.log(`Listening for requests on port ${port}`);
  });

export { app, server}