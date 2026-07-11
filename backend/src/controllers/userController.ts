import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {

    static async registerUser(req: Request, res: Response) {
        try {
            if (!req.body) {
                throw new Error("Registration details missing")
            }
            
            const user = await UserService.registerUser(req.body);

            res.json({
                success: true,
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

        static async updateUser(req: Request, res: Response) {
        try {
            if (!req.body) {
                throw new Error("Update details missing")
            }
            
            const user = await UserService.updateUser(req.body);

            res.json({
                success: true,
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}