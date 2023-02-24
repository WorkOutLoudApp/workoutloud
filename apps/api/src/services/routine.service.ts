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

const addRoutine = async (name: string, description: string) => {
    const prisma = new PrismaClient()
    try {
        const routine = await prisma.routine.create({
            data: {
                name,
                description,
                userId: 1
            }
        })
        return routine
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

export default {
    getRoutines,
    addRoutine
}