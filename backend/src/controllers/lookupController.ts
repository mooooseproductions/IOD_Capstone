import { LookupService } from "../services/lookupServices";
import { Request, Response } from "express";

export class LookupController {
    static async getIngredients(req: Request, res: Response) {
        try {
            const result = await LookupService.getIngredients();

            res.json({
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

    static async getStyles(req: Request, res: Response) {
        try {
            const result = await LookupService.getStyles();

            res.json({
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

    static async addIngredient(req: Request, res: Response) {
        try {
            const result = await LookupService.addIngredient(req.body);

            res.json({
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

    static async addStyle(req: Request, res: Response) {
        try {
            const result = await LookupService.addStyle(req.body);

            res.json({
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