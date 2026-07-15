import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
        permissions?: {
            canViewSensitive: boolean;
        };
    }

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorisation header missing",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token required"
            });
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {
            userId: number;
            role: string;
        };

        req.user = decode;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export function adminMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "User access level does not allow this action"
        });
    }

    next();
}