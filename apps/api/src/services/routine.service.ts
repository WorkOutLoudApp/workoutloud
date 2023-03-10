import { PrismaClient } from '@prisma/client'

const getRoutines = async (userId: number) => {
    const prisma = new PrismaClient()
    try {
        const routines = await prisma.routine.findMany({
            where: {
                userId
            }
        })
        return routines
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

const getRoutine = async (userId: number, routineId: number) => {
    const prisma = new PrismaClient()
    try {
        const routine = await prisma.routine.findFirst({
            where: {
                userId,
                id: routineId
            }
        })
        return routine
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

const addRoutine = async (userId: number, name: string, description: string) => {
    const prisma = new PrismaClient()
    try {
        const routine = await prisma.routine.create({
            data: {
                name,
                description,
                userId
            }
        })
        return routine
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

const deleteRoutine = async (userId: number, routineId: number) => {
    const prisma = new PrismaClient()
    try {
        console.log(routineId)
        const routine = await getRoutine(userId, routineId)
        if (!routine) return null
        const exercises = await getExercises(routineId)
        if (exercises && exercises.length > 0) {
            await prisma.exercise.deleteMany({
                where: {
                    routineId
                }
            })
        }
        await prisma.routine.delete({
            where: {
                id: routineId
            }
        })
        return true
    } catch (error) {
        console.log(error)
        return null
    } finally {
        await prisma.$disconnect()
    }
}

const favoriteRoutine = async (routineId: number) => {
    const prisma = new PrismaClient()
    try {
        const routine = await prisma.routine.findFirst({
            where: {
                id: routineId
            }
        })
        if (!routine) return null
        const updatedRoutine = await prisma.routine.update({
            where: {
                id: routineId
            },
            data: {
                isFavorite: !routine.isFavorite
            }
        })
        return updatedRoutine
        return null
    } finally {
        await prisma.$disconnect()
    }
}

const getExercises = async (routineId: number) => {
    const prisma = new PrismaClient()
    try {
        const routines = await prisma.exercise.findMany({
            where: {
                routineId
            }
        })
        return routines
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

const addExercise = async (userId: number, routineId: number, name: string, description: string, image?: string) => {
    const prisma = new PrismaClient()
    try {
        const exercise = await prisma.exercise.create({
            data: {
                name,
                description,
                image,
                routineId
            }
        })
        return exercise
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

const deleteExercise = async (exerciseId: number) => {
    const prisma = new PrismaClient()
    try {
        await prisma.exercise.delete({
            where: {
                id: exerciseId
            }
        })
        return true
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

export default {
    getRoutines,
    getRoutine,
    addRoutine,
    deleteRoutine,
    favoriteRoutine,
    getExercises,
    addExercise,
    deleteExercise
}