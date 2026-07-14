import { LookupRepo } from "../repositories/lookupRepo";

export class LookupService {
    static async getIngredients() {
        return await LookupRepo.getIngredients();
    }

    static async getStyles() {
        return await LookupRepo.getStyles();
    }

    static async addIngredient(input: any) {
        return await LookupRepo.addIngredient(input);
    }

    static async addStyle(input: any) {
        return await LookupRepo.addStyle(input);
    }
}