import { NextFunction, Request, RequestHandler, Response } from 'express'

export const loginUser = async (req: Request, res: Response) => {
    res.json({msg: 'login user'})
}

export const registerUser = async (req: Request, res: Response) => {
    res.json({msg: 'register user'})
}
