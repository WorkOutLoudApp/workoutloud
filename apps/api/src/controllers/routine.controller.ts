import { NextFunction, Request, RequestHandler, Response } from 'express'
import routineService from '@src/services/routine.service'

export const getRoutines: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const routines = await routineService.getRoutines(1)
        return res.json(routines)
    } catch (err) {
        return next(err)
    }
}

export const addRoutine: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, description } = req.body
        if (!name) return res.status(400).json({ message: 'Missing "name"' })
        if (!description) return res.status(400).json({ message: 'Missing "description"' })

        const routine = await routineService.addRoutine(name, description)
        if (!routine) return res.status(400).json({ message: 'Error creating routine' })
        return res.json(routine)
    } catch (err) {
        return next(err)
    }
}
