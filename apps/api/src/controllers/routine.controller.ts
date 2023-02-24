import { NextFunction, Request, RequestHandler, Response } from 'express'

export const addRoutine: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.json({ message: 'Hello World!' })
    } catch (err) {
        return next(err)
    }
}
