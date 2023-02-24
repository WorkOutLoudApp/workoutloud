import { Router } from 'express'
import { loginUser, registerUser, loginGoogle, registerGoogle} from '@src/controllers/userController'
import {addRoutine} from "@src/controllers/routine.controller";

require('dotenv').config()

const router = Router({ mergeParams: true })

router.post('/add', addRoutine)

export default router