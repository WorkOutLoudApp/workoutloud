import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export const loginUser = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()

    try {
        const { email, password } = req.body
        const account = await prisma.account.findFirst({
            where: {
                email,
                password
            }
        })
        if (account) {
            res.json({verify: true}) 
        } else {
            res.json({verify: false})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred while retrieving the user' })
    } finally {
        await prisma.$disconnect()
    }
}

export const loginGoogle = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    try {
        const token=req.body.token
        const email=token.email
        const password=token.sub
        const account = await prisma.account.findFirst({
            where: {
                email,
                password
            }
        })
        if (account) {
            res.json({verify: true}) 
        } else {
            res.json({verify: false})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred while retrieving the user' })
    } finally {
        await prisma.$disconnect()
    }
}



export const registerUser = async (req: Request, res: Response) => {
    res.json({msg: 'register user'})
}