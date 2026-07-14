import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AuthRequest } from "../middleware/authMiddleware";
import { registrationSchema } from "../validation/registrationSchema";

export class UserController {

    static async registerUser(req: Request, res: Response) {
        try {

            const validate = registrationSchema.safeParse(req.body);
            if(!validate.success) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid registration details",
                    errors: validate.error.issues,
                });
            }

            const user = await UserService.registerUser(validate.data);

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async updateUser(req: AuthRequest, res: Response) {
        try {
            if (!req.body) {
                throw new Error("Update details missing")
            }

            const user = await UserService.updateUser(req.body, req);
            
            res.json({
                success: true,
                message: "Details updated successfully",
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getUserDetails(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await UserService.getUserDetails(id);
            console.log(user);
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

    static async getAllUsers(req: Request, res: Response) {
        try {

            const status = req.query.status as string | undefined;
            console.log(status);
            const user = await UserService.getAllUsers(status);
            

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

    static async removeUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await UserService.removeUser(id);

            res.json({
                success: true,
                message: "User removed successfully",
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