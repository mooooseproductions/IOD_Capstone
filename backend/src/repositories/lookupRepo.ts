import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class LookupRepo {
    static async getIngredients() {
        return await prisma.ingredient.findMany();
    }

    static async getStyles() {
        return await prisma.brewStyle.findMany();
    }

    static async addIngredient(input: any) {
        const type = input.type.trim();
        const name = input.name.trim();
        const normalisedName = input.name.trim().toLowerCase();

        return await prisma.ingredient.upsert({
            where: {
                normalisedName,
            },
            update: {},
            create: {
                type,
                name,
                normalisedName
            }
        });
    }

    static async addStyle(input: any) {
        const name = input.name.trim();
        const normalisedName = input.name.trim().toLowerCase();

        return await prisma.brewStyle.upsert({
            where: {
                normalisedName,
            },
            update: {},
            create: {
                name,
                normalisedName
            }
        });
    }
}