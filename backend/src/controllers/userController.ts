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

    static async updateUser(req: Request, res: Response) {
        try {
            if (!req.body) {
                throw new Error("Update details missing")
            }

            const user = await UserService.updateUser(req.body);

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