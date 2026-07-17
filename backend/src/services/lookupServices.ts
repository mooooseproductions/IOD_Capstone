import { LookupRepo } from "../repositories/lookupRepo";
import { IngredientDTO, StyleDTO } from "../classes/lookupDTO";

export class LookupService {
    static async getIngredients() {
        const ingredient =  await LookupRepo.getIngredients();
        return ingredient.map(i => new IngredientDTO(i));
    }

    static async getStyles() {
        const style = await LookupRepo.getStyles();
        return style.map(s => new StyleDTO(s));
    }

    static async addIngredient(input: any) {
        return await LookupRepo.addIngredient(input);
    }

    static async addStyle(input: any) {
        return await LookupRepo.addStyle(input);
    }
}