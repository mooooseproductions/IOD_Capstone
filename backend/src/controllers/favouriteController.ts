import { FavouriteService } from "../services/favouriteServices";
import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

export class FavouriteController {
    static async getFavourites(req: AuthRequest, res: Response) {
        try {
            const userId = Number(req.user?.userId);

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required",
                });
            }

            const result = await FavouriteService.getFavourites(userId);

            return res.json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async addFavourite(req: AuthRequest, res: Response) {
        try {
            const brewId = Number(req.params.brewId);
            const userId = Number(req.user?.userId);

            const result = await FavouriteService.addFavourite(userId, brewId);

            return res.status(201).json({
                success: true,
                data: result
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async removeFavourite(req: AuthRequest, res: Response) {
        try {
            const brewId = Number(req.params.brewId);
            const userId = Number(req.user?.userId);

            const result = await FavouriteService.removeFavourite(userId, brewId);

            return res.json({
                success: true,
                data: result
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
