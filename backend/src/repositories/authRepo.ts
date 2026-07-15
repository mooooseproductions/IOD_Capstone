import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepo {
    static async saveRefreshToken(data: {
        token: string;
        userId: number;
        expiresAt: Date;
    },) {
        return prisma.refreshTokens.create({
            data
        });
    }

    static async logOut(refreshToken: string) {
        await prisma.refreshTokens.deleteMany({
            where: {
                token: refreshToken,
            },
        });
        return true;
    }

    static async login(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }

    static async checkRefreshToken(token: string) {
        const savedToken = await prisma.refreshTokens.findUnique({
            where: {
                token,
            },
            include: {
                user: true,
            },
        });
        return savedToken;
    }

    static async removeRefreshToken(token: string) {
        return await prisma.refreshTokens.delete({
            where: {
                token,
            },
        });
    }
}