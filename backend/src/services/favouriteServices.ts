import { SearchBrewDTO } from "../classes/brewDTO";
import { FavouriteRepo } from "../repositories/favouriteRepo";

export class FavouriteService {
    static async getFavourites(userId: number) {
        const fav = await FavouriteRepo.getFavourites(userId);
        return fav.map(f => ({
            id: f.id,
            brewId: f.brewId,
            brew: new SearchBrewDTO(f.brew),
        }))
    }

    static async addFavourite(userId: number, brewId: number) {
        return await FavouriteRepo.addFavourite(userId, brewId);
    }

    static async removeFavourite(userId: number, brewId: number) {
        return await FavouriteRepo.removeFavourite(userId, brewId);

    }
}
