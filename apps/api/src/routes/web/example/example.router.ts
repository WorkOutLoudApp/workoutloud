import { Router } from 'express'
import { getExample } from '@src/controllers/example.controller'
import { getAuth } from '@src/controllers/auth.controller'

const router = Router({ mergeParams: true })

router.use('/hello', getExample)
router.use('/auth', getAuth)
export default router
