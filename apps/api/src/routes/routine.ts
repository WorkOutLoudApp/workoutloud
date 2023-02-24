import { Router } from 'express'
import {addRoutine, getRoutines} from "@src/controllers/routine.controller";

const router = Router({ mergeParams: true })

router.get('/getRoutines', getRoutines)
router.post('/add', addRoutine)

export default router