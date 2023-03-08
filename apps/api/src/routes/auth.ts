import { Router, Request, Response } from 'express'
import { requireAuth } from '@src/middlewares/requireAuth'

require('dotenv').config()

const router = Router()
router.use(requireAuth)
router.get('/', (req: Request, res: Response) => {
    res.send({message: 'access granted'})
  })


export default router