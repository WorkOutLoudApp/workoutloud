import { Router, Request, Response } from 'express'
import { loginUser, registerUser, loginGoogle, registerGoogle} from '@src/controllers/userController'

require('dotenv').config()

const router = Router({ mergeParams: true })

router.post('/login', loginUser)
router.post('/googlelogin', loginGoogle)

router.post('/register', registerUser)
router.post('/googleregister', registerGoogle)
export default router