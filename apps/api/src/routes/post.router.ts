import { Router } from 'express'
import {
    getPosts,
    addPost,
    likePost
} from "@src/controllers/post.controller"
import { requireAuth } from '@src/middlewares/requireAuth'

const router = Router({ mergeParams: true })
router.use(requireAuth)
router.get('/getPosts', getPosts)
router.post ('/add', addPost)
router.post ('/:id/like', likePost)

export default router