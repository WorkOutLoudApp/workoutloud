import { Router, Request, Response } from 'express'
import { requireAuth } from '@src/middlewares/requireAuth'
import { getRoutines, getFavorites, getExercises } from '@src/controllers/workoutController'

require('dotenv').config()

const router = Router()
router.use(requireAuth)
router.get('/routine', getRoutines)
router.get('/favorite', getFavorites)
router.get('/exercise', getExercises)
export default router