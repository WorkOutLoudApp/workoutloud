import { NextFunction, Request, RequestHandler, Response } from 'express'
import routineService from '@src/services/routine.service'

export const getRoutines: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {userId} = res.locals
        if (!userId) return res.status(400).json({message: 'No user id'})
        const routines = await routineService.getRoutines(userId)
        if (!routines) return res.status(400).json({message: 'Error getting routines'})
        return res.json(routines)
    } catch (err) {
        return next(err)
    }
}, getRoutine: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {id} = req.params
        const {userId} = res.locals
        if (!userId) return res.status(400).json({message: 'No user id'})
        const routine = await routineService.getRoutine(userId, parseInt(id, 10))
        if (!routine) return res.status(400).json({message: 'Error getting routine'})
        return res.json(routine)
    } catch (err) {
        return next(err)
    }
}, addRoutine: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {userId} = res.locals
        if (!userId) return res.status(400).json({message: 'No user id'})
        const {name, description} = req.body
        if (!name) return res.status(400).json({message: 'Missing "name"'})
        if (!description) return res.status(400).json({message: 'Missing "description"'})

        const routine = await routineService.addRoutine(userId, name, description)
        if (!routine) return res.status(400).json({message: 'Error creating routine'})
        return res.json(routine)
    } catch (err) {
        return next(err)
    }
}, deleteRoutine: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {userId} = res.locals
        if (!userId) return res.status(400).json({message: 'No user id'})
        const {id} = req.params
        const deleted = await routineService.deleteRoutine(userId, parseInt(id, 10))
        if (!deleted) return res.status(400).json({message: 'Error deleting routine'})
        return res.json(deleted)
    } catch (err) {
        return next(err)
    }
}, favoriteRoutine: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {id} = req.params

        const routine = await routineService.favoriteRoutine(parseInt(id, 10))
        if (!routine) return res.status(400).json({message: 'Error favoriting routine'})
        return res.json(routine)
    } catch (err) {
        return next(err)
    }
}, getExercises: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {id} = req.params
        const routines = await routineService.getExercises(parseInt(id, 10))
        if (!routines) return res.status(400).json({message: 'Error getting routines'})
        return res.json(routines)
    } catch (err) {
        return next(err)
    }
}, addExercise: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {id} = req.params
        const {name, description, image} = req.body
        if (!name) return res.status(400).json({message: 'Missing "name"'})
        if (!description) return res.status(400).json({message: 'Missing "description"'})

        const exercise = await routineService.addExercise(1, parseInt(id, 10), name, description, image)
        if (!exercise) return res.status(400).json({message: 'Error creating exercise'})
        return res.json(exercise)
    } catch (err) {
        return next(err)
    }
}, deleteExercise: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {id} = req.params

        const deleted = await routineService.deleteExercise(parseInt(id, 10))
        if (!deleted) return res.status(400).json({message: 'Error deleting exercise'})
        return res.json(deleted)
    } catch (err) {
        return next(err)
    }
};




