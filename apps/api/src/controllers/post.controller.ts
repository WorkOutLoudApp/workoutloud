import { NextFunction, Request, RequestHandler, Response } from 'express'
import postService from '@src/services/post.service'

export const getPosts: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {userId} = res.locals
        if (!userId) return res.status(400).json({message: 'No user id'})
        const posts = await postService.getPosts()
        if (!posts) return res.status(400).json({message: 'Error getting posts'})
        return res.json(posts)
    } catch (err) {
        return next(err)
    }
}

export const addPost: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {userId} = res.locals
        if (!userId) return res.status(400).json({message: 'No user id'})

        const { description } = req.body
        if (!description) return res.status(400).json({message: 'Missing "description"'})

        const posts = await postService.addPost(userId, description)
        if (!posts) return res.status(400).json({message: 'Error getting posts'})
        return res.json(posts)
    } catch (err) {
        return next(err)
    }
}