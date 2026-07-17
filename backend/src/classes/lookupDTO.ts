import { IngredientInterface, StyleInterface } from "../interfaces/lookupInterface";

export class StyleDTO {
    id: number;
    name: string;

    constructor(style: StyleInterface) {
        this.id = style.id;
        this.name = style.name;
    }
}

export class IngredientDTO {
    id: number;
    type: string;
    name: string;

    constructor(data: IngredientInterface) {
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
    }
}