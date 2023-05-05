import { PrismaClient } from '@prisma/client'

const getPosts = async (userId: number) => {
    const prisma = new PrismaClient()
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
                PostLike: true,
            },
            orderBy: {
                timestamp: 'desc',
            },
        })
        const formattedPosts = posts.map((post) => ({
            ...post,
            likes: post.PostLike?.length || 0,
            isLikedByUser: post.PostLike?.some((like) => like.userId === userId)
        }));
        return formattedPosts
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

const likePost = async (userId: number, postId: number): Promise<any> => {
    const prisma = new PrismaClient()
    try {
        const existingLike = await prisma.postLike.findFirst({
            where: {
                userId,
                postId,
            },
        })

        if (existingLike) {
            await prisma.postLike.delete({
                where: {
                    id: existingLike.id,
                },
            })
            return {
                success: true,
                message: 'Post unliked successfully',
            }
        } else {
            const newLike = await prisma.postLike.create({
                data: {
                    postId,
                    userId,
                },
            })
            return {
                success: true,
                message: 'Post liked successfully',
            }
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'An error occurred while liking/unliking the post',
        }
    } finally {
        await prisma.$disconnect()
    }
}


export default {
    getPosts,
    addPost,
    likePost
}