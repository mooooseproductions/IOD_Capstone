import { Decimal } from "@prisma/client/runtime/library";

export interface ActiveBrewInterface {
    id: number;
    name: string;
    status: string;
    styleId: number|null;
    dateStarted: Date;
    dateFinished: Date|null;
    temperature: number|null;
    temperatureUnit: string|null;
    originalGravity: Decimal|null;
    finalGravity: Decimal|null;
    batchSize: Decimal;
    batchUnit: string;
    userId: number;
    style: {
        id: number;
        name: string;
        normalisedName: string;
    }|null
}