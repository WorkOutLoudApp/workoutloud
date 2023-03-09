import { Router, Request, Response } from 'express'
import { requireAuth } from '@src/middlewares/requireAuth'
import { getRoutines } from '@src/controllers/workoutController'

require('dotenv').config()

const router = Router()
router.use(requireAuth)
router.get('/routine', getRoutines)


export default router