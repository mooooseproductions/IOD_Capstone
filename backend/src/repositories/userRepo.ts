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
            }
        });
    }
}