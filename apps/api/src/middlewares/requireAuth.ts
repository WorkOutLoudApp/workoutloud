import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'


require('dotenv').config()

interface RequestWithAuth extends Request {
    accountId: number
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token is required'})
    }

    const token = authorization.split(' ')[1]

    const prisma = new PrismaClient()
    try {
        const {id}  = jwt.verify(token, process.env.SECRET as Secret) as JwtPayload
        console.log({id: id})
        const account = await prisma.account.findFirst({
            where: {
                id
            }
        })
        if (account) {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    } finally {
        await prisma.$disconnect()
    }
}