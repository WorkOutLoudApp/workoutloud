import { Router } from 'express'
import {
    getPosts,
    addPost
} from "@src/controllers/post.controller"
import { requireAuth } from '@src/middlewares/requireAuth'

const router = Router({ mergeParams: true })
router.use(requireAuth)
router.get('/getPosts', getPosts)
router.get('/add', addPost)

export default router