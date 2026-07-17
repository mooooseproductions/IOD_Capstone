import { Decimal } from "@prisma/client/runtime/library";

export interface SearchBrewInterface {
    id: number;
    name: string;
    status: string;
    batchSize: Decimal;
    batchUnit: string;
    originalGravity: Decimal | null;
    finalGravity: Decimal | null;
    style: {
        id: number;
        name: string;
    }|null;
    user: {
        id: number;
        handle: string;
    };
    ingredient:
    {
        timing: string;
        amount: Decimal;
        unit: string;
        ingredient: {
            id: number;
            name: string;
            type: string;
        }
    }[];
}