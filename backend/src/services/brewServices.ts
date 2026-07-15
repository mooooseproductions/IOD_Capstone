import { BrewRepo } from '../repositories/brewRepo';

export class BrewService {
    static async addBrew(id: number, brew: any) {
        return await BrewRepo.addBrew(id, brew);
    }
}