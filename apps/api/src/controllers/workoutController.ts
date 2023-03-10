import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
require('dotenv').config()

export const getRoutines = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()

    let message = ''
    try {
        let userId = res.locals.userId
        const routines = await prisma.routine.findMany({
            where: {
                userId
            },
            orderBy: {
                name: 'asc'
            }
        })
        res.send(routines)
    } catch (error) {
        message = 'Error occured while query routines: ' + error
    } finally {
        await prisma.$disconnect()
    }
}

export const getFavorites = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()

    let message = ''
    try {
        let userId = res.locals.userId
        const favorites = await prisma.routine.findMany({
            where: {
                userId,
                isFavorite: true
            },
            orderBy: {
                name: 'asc'
            }
        })
        res.send(favorites)
    } catch (error) {
        message = 'Error occured while query routines: ' + error
    } finally {
        await prisma.$disconnect()
    }
}

export const getExercises = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()

    let message = ''
    try {
        let userId = res.locals.userId
        const exercises = await prisma.exercise.findMany({
            where: {
                routine: {
                    userId
                }
            },
            orderBy: {
                name: 'asc'
            }
        })
        res.send(exercises)
    } catch (error) {
        message = 'Error occured while query routines: ' + error
    } finally {
        await prisma.$disconnect()
    }
}