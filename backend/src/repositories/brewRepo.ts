import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class BrewRepo {
    static async addBrew(brew: any) {
        return prisma.brewRecord.create({
            data: {
                name: brew.name,
                status: brew.status ?? "planning",
                style: brew.style,
                batchSize: brew.batchSize,
                originalGravity: brew.originalGravity ?? undefined,
                userId: brew.userId,

                ingredient: {
                    create: brew.ingredients.map((item: any) => ({
                        timing: item.timing,
                        amount: item.amount,
                        unit: item.unit,

                        ingredient: {
                            connectOrCreate: {
                                where: {
                                    name: item.name
                                },
                                create: {
                                    name: item.name,
                                    type: item.type
                                }
                            }
                        }
                    }))
                },

                note: {
                    create: brew.notes?.map((note: any) => ({
                        content: note.content
                    })) ?? []
                }
            },

            include: {
                ingredient: {
                    include: {
                        ingredient: true
                    }
                },
                note: true,
                user: true
            }
        });
    }

    static async updateBrew(brew: any) {

    }

    static async findBrew() {

    }
}