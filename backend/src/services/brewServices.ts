import { BrewRepo } from '../repositories/brewRepo';

export class BrewService {
    static async addBrew(id: number, brew: any) {
        return await BrewRepo.addBrew(id, brew);
    }

    static async getBrewById(brew: number, user: number) {
        return await BrewRepo.getBrewById(brew, user);
    }

    static async updateBrew(brewId: number, userId: number,  brew: any) {
        return await BrewRepo.updateBrew(brewId, userId, brew);
    }
}