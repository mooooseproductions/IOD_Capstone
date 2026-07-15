import { FavouriteRepo } from "../repositories/favouriteRepo";

export class FavouriteService {
    static async getFavourites(userId: number) {
        return await FavouriteRepo.getFavourites(userId);
    }

    static async addFavourite(userId: number, brewId: number) {
        return await FavouriteRepo.addFavourite(userId, brewId);
    }

    static async removeFavourite(userId: number, brewId: number) {
        return await FavouriteRepo.removeFavourite(userId, brewId);

    }
}
