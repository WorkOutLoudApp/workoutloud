import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { userInfo } from 'os'
import { stringify } from 'querystring'
import { json } from 'body-parser'

export const loginUser = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    let success = false
    let user = {}
    let message = ''

    try {
        const { email, password } = req.body
        const account = await prisma.account.findFirst({
            where: {
                email,
                password
            }
        })
        if (account) {
            try {
                const dbUser = await prisma.user.findFirst({
                    where: {
                        accountId: account.id
                    }
                })
                if (dbUser) {
                    success = true
                    user = {
                        email: account.email,
                        username: dbUser.username,
                        firstName: dbUser.firstName,
                        lastName: dbUser.lastName,
                        avatar: dbUser.avatar
                    }
                } else {
                    message = 'User not found'
                }
            } catch (error) {
                message = 'Error occured white verifyng user' + error
            }
        } else {
            res.json({ verify: false, user: {} })
        }
    } catch (error) {
        message = 'Error occured white verifyng account' + error
    } finally {
        await prisma.$disconnect()
        res.json({ success, user, message })
    }
}

export const loginGoogle = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    let success = false
    let user = {}
    let message = ''

    try {
        const token = req.body.token
        const email = token.email
        const password = token.sub
        const account = await prisma.account.findFirst({
            where: {
                email,
                password
            }
        })
        if (account) {
            try {
                const dbUser = await prisma.user.findFirst({
                    where: {
                        accountId: account.id
                    }
                })
                if (dbUser) {
                    success = true
                    user = {
                        email: account.email,
                        username: dbUser.username,
                        firstName: dbUser.firstName,
                        lastName: dbUser.lastName,
                        avatar: dbUser.avatar
                    }
                } else {
                    message = 'User not found'
                }
            } catch (error) {
                message = 'Error occured white verifyng user' + error
            }
        }
    } catch (error) {
        message = 'Error occured white verifyng account' + error
    } finally {
        await prisma.$disconnect()
        res.json({ success, user, message })
    }
}



export const registerUser = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    let success = false
    let user = {}
    let message = ''

    try {
        const { firstName, lastName, username, email, password } = req.body
        const account = await prisma.account.findFirst({
            where: {
                email
            }
        })
        if (account) {
            message = 'Email already registered'
        } else {
            await prisma.account.create({
                data: {
                    email,
                    password
                }
            }).then(async (newAccount) => {
                await prisma.user.create({
                    data: {
                        username,
                        firstName,
                        lastName,
                        avatar: '',
                        accountId: newAccount.id,
                    }
                }).then(() => {
                    success = true
                    user = {
                        email,
                        username,
                        firstName,
                        lastName,
                        avatar: ''
                    }
                    message = 'Registration successful'
                }).catch((error) => {
                    prisma.account.delete({
                        where: {
                            email
                        }
                    })
                    message = 'Registration failed: ' + error
                })
            }).catch((error) => {
                message = 'Registration failed: ' + error
            })

        }
    } catch (error) {
        message = 'Registration failed: ' + error
    } finally {
        await prisma.$disconnect()
        res.json({ success, user, message })
    }
}

export const registerGoogle = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    let success = false
    let user = {}
    let message = ''

    try {
        const token = req.body.token

        const account = await prisma.account.findFirst({
            where: {
                email: token.email
            }
        })
        if (account) {
            message = 'Email already registered'
        } else {
            const firstName = token.given_name || ''
            const lastName = token.family_name || ''
            const username = token.email
            const email = token.email
            const password = token.sub
            const avatar = token.picture

            await prisma.account.create({
                data: {
                    email,
                    password
                }
            }).then(async (newAccount) => {
                await prisma.user.create({
                    data: {
                        username,
                        firstName,
                        lastName,
                        avatar,
                        accountId: newAccount.id,
                    }
                }).then(() => {
                    success = true
                    user = {
                        email,
                        username,
                        firstName,
                        lastName,
                        avatar
                    }
                    message = 'Registration successful'
                }).catch((error) => {
                    prisma.account.delete({
                        where: {
                            email
                        }
                    })
                    message = 'Registration failed: ' + error
                })
            }).catch((error) => {
                message = 'Registration failed: ' + error
            })

        }
    } catch (error) {
        message = 'Registration failed: ' + error
    } finally {
        await prisma.$disconnect()
        res.json({ success, user, message })
    }
}