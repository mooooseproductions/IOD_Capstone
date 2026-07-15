import { BrewService } from "../services/brewServices";
import { Request, Response } from "express";
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
}