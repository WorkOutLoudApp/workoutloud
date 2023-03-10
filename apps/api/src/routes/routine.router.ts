import { Router } from 'express'
import {getRoutines, getRoutine, addRoutine, favoriteRoutine, deleteRoutine, addExercise, deleteExercise, getExercises} from "@src/controllers/routine.controller"
import { requireAuth } from '@src/middlewares/requireAuth'

const router = Router({ mergeParams: true })
router.use(requireAuth)
router.get('/getRoutines', getRoutines)
router.post('/add', addRoutine)
router.get('/:id/get', getRoutine)
router.patch('/:id/favorite', favoriteRoutine)
router.get('/:id/delete', deleteRoutine)
router.get('/:id/getExercises', getExercises)
router.post('/:id/addExercise', addExercise)
router.get('/:id/deleteExercise', deleteExercise)

export default router