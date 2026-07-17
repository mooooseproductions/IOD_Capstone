import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class UserRepo {
    static async registerUser(user: any, password: string) {
        return await prisma.user.create({
            data: {
                name: user.name,
                handle: user.handle,
                email: user.email,
                password: password,
            }
        })
    }

    static async checkEmailExists(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    static async checkHandleExists(handle: string) {
        return await prisma.user.findUnique({
            where: {
                handle
            }
        });
    }

    static async updateUser(id: number, update: any) {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                ...(update.handle !== undefined && { handle: update.handle }),
                ...(update.name !== undefined && { name: update.name }),
                ...(update.password !== undefined && { password: update.password }),
                ...(update.status !== undefined && { status: update.status}),
                ...(update.role !== undefined && { role: update.role})
            }
        });
    }

    static async getUserDetails(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user;
    }

    // descoped admin function for monitoring users
    // static async getAllUsers(status?: string) {
    //     const users = await prisma.user.findMany({
    //         where: status ? { status } : {}
    //     });
    //     return users;
    // }

    // descoped admin function
    // static async removeUser(id: number) {
    //     await prisma.user.delete({
    //         where: {
    //             id
    //         }
    //     });
    //     return true;
    // }

    static async getUserProfile(id: number) {
        return prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                handle: true,
                email: true,
                accountCreatedAt: true,

                brew: {
                    include: {
                        style: true,
                    },
                    orderBy: {
                        id: "desc",
                    },
                },
            },
        });
    }
}