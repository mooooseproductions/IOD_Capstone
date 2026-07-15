import { BrewRepo } from '../repositories/brewRepo';

export class BrewService {
    static async addBrew(id: number, brew: any) {
        return await BrewRepo.addBrew(id, brew);
    }

    static async getBrewById(brew: number, user: number) {
        return await BrewRepo.getBrewById(brew, user);
    }

    static async getBrewTemplate(brewId: number) {
        return await BrewRepo.getBrewTemplate(brewId);
    }

    static async updateBrew(brewId: number, userId: number,  brew: any) {
        return await BrewRepo.updateBrew(brewId, userId, brew);
    }

    static async searchBrews(type: string, query: string) {
        return await BrewRepo.searchBrews(type, query);
    }
}
