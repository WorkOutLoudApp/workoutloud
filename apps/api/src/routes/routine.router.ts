import { Router } from 'express'
import {getRoutines, getRoutine, addRoutine, addExercise, getExercises} from "@src/controllers/routine.controller"
import { requireAuth } from '@src/middlewares/requireAuth'

const router = Router({ mergeParams: true })
router.use(requireAuth)
router.get('/getRoutines', getRoutines)
router.post('/add', addRoutine)
router.get('/:id/get', getRoutine)
router.get('/:id/getExercises', getExercises)
router.post('/:id/addExercise', addExercise)

export default router