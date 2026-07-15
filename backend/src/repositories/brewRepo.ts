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

    static async updateBrew(brew: any) {
        
    }

    static async getBrew(id: number) {

    }
}