import { Router } from 'express'
import { getExample } from '@src/controllers/example.controller'
import { getAuth } from '@src/controllers/auth.controller'
import { getUsers } from '@src/controllers/users.controller'

const router = Router({ mergeParams: true })

router.use('/hello', getExample)
router.use('/auth', getAuth)
router.use('/users', getUsers)
// router.use('/auth', getUsers)
export default router
