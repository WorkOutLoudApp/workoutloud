import { PrismaClient } from '@prisma/client'

const getPosts = async () => {
    const prisma = new PrismaClient()
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true
            },
            orderBy: {
                timestamp: 'desc'
            }
        })
        return posts
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

const addPost = async (userId: number, description: string) => {
    const prisma = new PrismaClient()
    try {
        const post = await prisma.post.create({
            data: {
                description,
                userId
            },
            include: {
                user: true
            }
        })
        return post
    } catch (error) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}

export default {
    getPosts,
    addPost
}