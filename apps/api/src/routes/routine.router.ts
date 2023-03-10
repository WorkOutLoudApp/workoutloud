import { Router } from 'express'
import {getRoutines, getRoutine, addRoutine, addExercise, getExercises} from "@src/controllers/routine.controller";

const router = Router({ mergeParams: true })

router.get('/getRoutines', getRoutines)
router.post('/add', addRoutine)
router.get('/:id/get', getRoutine)
router.get('/:id/getExercises', getExercises)
router.post('/:id/addExercise', addExercise)

export default router