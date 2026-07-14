import { BrewRepo } from '../repositories/brewRepo';

export class BrewService {
    static async addBrew(brew: any) {
        return await BrewRepo.addBrew(brew);
    }
}