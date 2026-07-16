import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class FavouriteRepo {
    static async getFavourites(userId: number) {
        return prisma.toBrewList.findMany({
            where: {
                userId,
            },
            include: {
                brew: {
                    include: {
                        style: true,
                        user: {
                            select: {
                                id: true,
                                handle: true,
                            },
                        },
                        ingredient: {
                            include: {
                                ingredient: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                id: "desc",
            },
        });
    }

    static async addFavourite(
        userId: number,
        brewId: number
    ) {
        return prisma.toBrewList.upsert({
            where: {
                userId_brewId: {
                    userId,
                    brewId,
                },
            },

            update: {},

            create: {
                userId,
                brewId,
            },
        });
    }

    static async removeFavourite(
        userId: number,
        brewId: number
    ) {
        return prisma.toBrewList.deleteMany({
            where: {
                    userId,
                    brewId,
            },
        });
    }

}
