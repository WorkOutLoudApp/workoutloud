import { Router } from 'express'
import { loginUser, registerUser} from '@src/controllers/userController'

const router = Router({ mergeParams: true })

router.post('/login', loginUser)

router.post('/register', registerUser)

export default router