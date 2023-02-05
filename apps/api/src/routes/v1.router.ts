import webRouter from '@src/routes/web'
import bodyParser from 'body-parser'
import { devOrigins } from '@src/utils/config/cors.config'
import cors from 'cors'
import { Router, Request, Response } from 'express'
import userRouter from '@src/routes/user'

require('dotenv').config()

const router = Router()
const dev = process.env.NODE_ENV !== 'production'

// Middlewares
router.use(
  cors({
    origin: dev ? devOrigins : '',
    credentials: true,
  })
)
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Routes
router.use('/web', webRouter)
router.use('/user', userRouter)

router.get('/key/google', (req: Request, res: Response) => {
  res.send({key: process.env.PUBLIC_GOOGLE_API_TOKEN})
})

export default router
