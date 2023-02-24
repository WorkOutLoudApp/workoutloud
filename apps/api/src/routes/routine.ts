import { Router } from 'express'
import {getRoutines, getRoutine, addRoutine} from "@src/controllers/routine.controller";

const router = Router({ mergeParams: true })

router.get('/getRoutines', getRoutines)
router.get('/get/:id', getRoutine)
router.post('/add', addRoutine)

export default router