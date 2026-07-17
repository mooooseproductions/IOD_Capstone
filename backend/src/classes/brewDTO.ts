import { Decimal } from "@prisma/client/runtime/library";
import { SearchBrewInterface } from "../interfaces/brewInterface";

export class SearchBrewDTO {
    id: number;
    name: string;
    status: string;
    style: {
        name: string;
    }|null;
    user: {
        handle: string;
    };
    batchSize: Decimal;
    batchUnit: string;
    ingredient: {
        ingredient: {
            id: number;
            name: string;
        }
    }[];

    constructor(data: SearchBrewInterface) {
        this.id = data.id;
        this.name = data.name;
        this.status = data.status;
        this.style = data.style ? {name: data.style.name} : null;
        this.user = {handle: data.user.handle};
        this.batchSize = data.batchSize;
        this.batchUnit = data.batchUnit;
        this.ingredient = data.ingredient.map(i => ({
            ingredient: {
                id: i.ingredient.id,
                name: i.ingredient.name
            },
        }));
    }
}