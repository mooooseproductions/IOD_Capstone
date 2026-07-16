import { Prisma, PrismaClient } from '@prisma/client';
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

    static async getBrewTemplate(brewId: number) {
        return prisma.brewRecord.findUnique({
            where: {
                id: brewId,
            },
            select: {
                id: true,
                name: true,
                batchSize: true,
                batchUnit: true,
                style: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                ingredient: {
                    select: {
                        id: true,
                        timing: true,
                        amount: true,
                        unit: true,
                        ingredient: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                            },
                        },
                    },
                },
            },
        });
    }

    static async searchBrews(
        type: string,
        query: string
    ) {
        const search = query.trim();

        let where: Prisma.BrewRecordWhereInput = {};

        switch (type) {
            case "name":
                where = {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                };
                break;

            case "style":
                where = {
                    style: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                };
                break;

            case "ingredient":
                where = {
                    ingredient: {
                        some: {
                            ingredient: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                };
                break;

            default:
                throw new Error("Invalid search type");
        }

        return prisma.brewRecord.findMany({
            where,

            select: {
                id: true,
                name: true,
                status: true,
                batchSize: true,
                batchUnit: true,
                originalGravity: true,
                finalGravity: true,

                style: {
                    select: {
                        id: true,
                        name: true,
                    },
                },

                user: {
                    select: {
                        id: true,
                        handle: true,
                    },
                },

                ingredient: {
                    select: {
                        timing: true,
                        amount: true,
                        unit: true,

                        ingredient: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                            },
                        },
                    },
                },
            },

            orderBy: {
                dateStarted: "desc",
            },

            take: 50,
        });
    }
}
