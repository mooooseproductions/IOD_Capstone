import { BrewService } from "../services/brewServices";
import { Request, Response } from "express";

export class BrewController {
    static async addBrew(req: Request, res: Response) {
        try {
            const brew = await BrewService.addBrew(req.body);

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
}