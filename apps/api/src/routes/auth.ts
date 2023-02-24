import { Router, Request, Response } from 'express'
import { getExample } from '@src/controllers/example.controller'
import { requireAuth } from '@src/middlewares/requireAuth'

require('dotenv').config()

const router = Router()
router.use(requireAuth)
router.get('/', (req: Request, res: Response) => {
    res.send({message: 'success'})
  })


export default router