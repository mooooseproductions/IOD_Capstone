import { PrismaClient } from '@prisma/client';
import { LookupRepo } from './lookupRepo';
const prisma = new PrismaClient();

export class BrewRepo {
    static async addBrew(id: number, brew: any) {
        const savedIngredients = await Promise.all(
            brew.ingredients.map(async (item: any) => {
                const ingredient = await LookupRepo.addIngredient({
                    name: item.name,
                    type: item.type,
                });

                return {
                    ingredientId: ingredient.id,
                    timing: item.timing,
                    amount: item.amount,
                    unit: item.unit,
                };
            })
        );

        return prisma.brewRecord.create({
            data: {
                name: brew.name,
                status: brew.status ?? "planning",
                styleId: brew.styleId,
                temperature: brew.temperature ?? undefined,
                temperatureUnit: brew.temperatureUnit ?? undefined,
                batchSize: brew.batchSize,
                batchUnit: brew.batchUnit,
                originalGravity: brew.originalGravity ?? undefined,
                finalGravity: brew.finalGravity ?? undefined,
                userId: id,

                ingredient: {
                    create: savedIngredients.map((item) => ({
                        timing: item.timing,
                        amount: item.amount,
                        unit: item.unit,

                        ingredient: {
                            connect: {
                                id: item.ingredientId,
                            },
                        },
                    })),
                },

                note: {
                    create:
                        brew.notes?.map((note: any) => ({
                            content: note.content,
                        })) ?? [],
                },
            },

            include: {
                style: true,
                ingredient: {
                    include: {
                        ingredient: true,
                    },
                },
                note: true,
                user: true,
            },
        });
    }

    static async updateBrew(
        brewId: number,
        userId: number,
        brew: any
    ) {
        const existingBrew = await prisma.brewRecord.findFirst({
            where: {
                id: brewId,
                userId,
            },
            select: {
                id: true,
            },
        });

        if (!existingBrew) {
            throw new Error(
                "Brew not found or you do not have permission to update it"
            );
        }

        return prisma.$transaction(async (tx) => {
            /*
              Remove the existing relationship records.
        
              This does not delete records from the main Ingredient table.
            */
            await tx.brewIngredient.deleteMany({
                where: {
                    brewId,
                },
            });

            await tx.brewNote.deleteMany({
                where: {
                    brewId,
                },
            });

            return tx.brewRecord.update({
                where: {
                    id: brewId,
                },

                data: {
                    name: brew.name,
                    status: brew.status,
                    styleId: brew.styleId,

                    batchSize: brew.batchSize,
                    batchUnit: brew.batchUnit,

                    temperature: brew.temperature ?? null,
                    temperatureUnit:
                        brew.temperatureUnit ?? null,

                    originalGravity:
                        brew.originalGravity ?? null,

                    finalGravity:
                        brew.finalGravity ?? null,

                    dateFinished:
                        brew.status === "complete"
                            ? new Date()
                            : null,

                    ingredient: {
                        create: brew.ingredients.map(
                            (item: any) => {
                                const name = item.name.trim();
                                const normalisedName =
                                    name.toLowerCase();

                                return {
                                    timing: item.timing,
                                    amount: item.amount,
                                    unit: item.unit,

                                    ingredient: {
                                        connectOrCreate: {
                                            where: {
                                                normalisedName,
                                            },

                                            create: {
                                                name,
                                                normalisedName,
                                                type: item.type,
                                            },
                                        },
                                    },
                                };
                            }
                        ),
                    },

                    note: {
                        create:
                            brew.notes?.map((note: any) => ({
                                content: note.content,
                            })) ?? [],
                    },
                },

                include: {
                    style: true,

                    ingredient: {
                        include: {
                            ingredient: true,
                        },
                    },

                    note: true,
                },
            });
        });
    }

    static async getBrewById(brewId: number, userId: number) {
        const brew = await prisma.brewRecord.findFirst({
            where: {
                id: brewId,
                userId,
            },
            include: {
                style: true,
                ingredient: {
                    include: {
                        ingredient: true,
                    },
                },
                note: true,
            },
        });
        return brew;
    }
}