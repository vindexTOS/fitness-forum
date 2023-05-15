import express from 'express'
import connectDB from './db/connect.js'
import { config } from 'dotenv'
import router from './routers/routers.js'
import authRouter from './routers/authRouter.js'
import { notFound } from './middleware/not-found.js'
import { errorHandler } from './middleware/error-handler.js'
import cors from 'cors'
const app = express()
config()
app.use(express.json())
app.use(cors())
app.use('/api/v1/wrestler', router)
app.use('/', authRouter)

app.use(notFound)
app.use(errorHandler)

const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => console.log(`server is listing to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
