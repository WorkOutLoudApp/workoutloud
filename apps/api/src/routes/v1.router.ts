import webRouter from '@src/routes/web'
import bodyParser from 'body-parser'
import { devOrigins } from '@src/utils/config/cors.config'
import cors from 'cors'
import { Router } from 'express'
import userRouter from '@src/routes/user'

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
export default router
