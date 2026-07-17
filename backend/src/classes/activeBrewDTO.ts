import { Decimal } from "@prisma/client/runtime/library";
import { ActiveBrewInterface } from "../interfaces/activeBrewInterface";

export class ActiveBrewDTO {
    id: number;
    name: string;
    status: string;
    dateStarted: Date;
    temperature: number|null;
    temperatureUnit: string|null;
    originalGravity: Decimal | null;
    finalGravity: Decimal | null;
    batchSize: Decimal;
    batchUnit: string;
    style: { name: string; }|null;

    constructor(data: ActiveBrewInterface) {
        this.id = data.id;
        this.name = data.name;
        this.status = data.status;
        this.dateStarted = data.dateStarted;
        this.temperature = data.temperature;
        this.temperatureUnit = data.temperatureUnit;
        this.originalGravity = data.originalGravity;
        this.finalGravity = data.finalGravity;
        this.batchSize = data.batchSize;
        this.batchUnit = data.batchUnit;
        this.style = data.style ? { name: data.style.name } : null;
    }
}