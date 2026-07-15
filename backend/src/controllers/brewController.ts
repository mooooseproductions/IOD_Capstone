import { BrewService } from "../services/brewServices";
import { Response } from "express";
import { brewSchema } from "../validation/brewValidation";
import { AuthRequest } from "../middleware/authMiddleware";

export class BrewController {
    static async addBrew(req: AuthRequest, res: Response) {
        try {

            const validate = brewSchema.safeParse(req.body);
            if (!validate.success) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid brew details",
                    errors: validate.error.issues,
                });
            }

            console.log("Validated brew: ", validate.data);

            const id = Number(req.user?.userId);
            const brew = await BrewService.addBrew(id, validate.data);

            res.json({
                success: true,
                data: brew
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getBrewById(req: AuthRequest, res: Response) {
        try {
            const brewId = Number(req.params.id);

            if (!req.user?.userId) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required",
                });
            }

            const brew = await BrewService.getBrewById(brewId, req.user.userId);

            res.json({
                success: true,
                data: brew
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getBrewTemplate(req: AuthRequest, res: Response) {
        try {
            const brewId = Number(req.params.id);

            if (!Number.isInteger(brewId) || brewId <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid brew ID",
                });
            }

            const brew = await BrewService.getBrewTemplate(brewId);

            if (!brew) {
                return res.status(404).json({
                    success: false,
                    message: "Brew not found",
                });
            }

            return res.json({
                success: true,
                data: brew,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async updateBrew(req: AuthRequest, res: Response) {
        try {

            const brewId = Number(req.params.id);

            if (!req.user?.userId) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required",
                });
            }

            const validate = brewSchema.safeParse(req.body);
            if (!validate.success) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid brew details",
                    errors: validate.error.issues,
                });
            }

            const userId = Number(req.user?.userId);
            const brew = await BrewService.updateBrew(brewId, userId, validate.data);

            res.json({
                success: true,
                data: brew
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async searchBrews(req: AuthRequest, res: Response) {
        try {
            const type = String(req.query.type ?? "");
            const query = String(req.query.q ?? "");

            if (!query.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Search text is required",
                });
            }

            const brew = await BrewService.searchBrews(type, query);

            return res.json({
                success: true,
                data: brew
            });
        } catch (error: any) {
            return res.status(error.message === "Invalid search type" ? 400 : 500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
