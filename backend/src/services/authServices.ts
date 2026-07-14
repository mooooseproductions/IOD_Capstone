import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { AuthRepo } from "../repositories/authRepo";

export class AuthService {

    static generateAccessToken(userId: number, role: string, email: string) {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET not found")
        };

        const expiresIn = (process.env.JWT_EXPIRES_IN || "1d") as SignOptions["expiresIn"];

        return jwt.sign(
            {
                userId,
                role,
                email
            },
            secret,
            {
                expiresIn,
            }
        )
    }

    static generateRefreshToken(userId: number, role: string, email: string) {
        const secret = process.env.JWT_REFRESH_SECRET;

        if (!secret) {
            throw new Error("JWT_REFRESH_SECRET is not defined");
        }

        const expiresIn = (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

        return jwt.sign(
            { userId, role, email },
            secret,
            { expiresIn }
        );
    }

    static async saveRefreshToken(userId: number, refreshToken: string) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const token = await AuthRepo.saveRefreshToken({
            token: refreshToken,
            userId,
            expiresAt: expiresAt,
        });
    }

    static async login(data: { email: string, password: string }) {
        if (!data.email || !data.password) {
            throw new Error("Email and Password required")
        };

        const user = await AuthRepo.login(data.email);

        if (!user) {
            throw new Error("User not found")
        };

        const validatePassword = await bcrypt.compare(data.password, user.password);

        if (!validatePassword) {
            throw new Error("Invalid password")
        };

        const accessToken = this.generateAccessToken(user.id, user.role, user.email);
        const refreshToken = this.generateRefreshToken(user.id, user.role, user.email);

        await this.saveRefreshToken(user.id, refreshToken);

        return {
            user: user,
            accessToken,
            refreshToken
        };
    }

    static async refreshToken(token: string) {
        if (!token) {
            throw new Error("Refresh token required");
        }

        const secret = process.env.JWT_REFRESH_SECRET;

        if (!secret) {
            throw new Error("JWT_REFRESH_SECRET not found")
        };

        const savedToken = await AuthRepo.checkRefreshToken(token);

        if (!savedToken) {
            throw new Error("Invalid refresh token")
        };

        if (savedToken.expiresAt < new Date()) {
            await AuthRepo.removeRefreshToken(token);
            throw new Error("Refresh token expired");
        };

        const decoded = jwt.verify(token, secret) as {
            userId: number;
            role: string;
            email: string;
        };

        const accessToken = this.generateAccessToken(
            decoded.userId,
            decoded.role,
            decoded.email
        );

        return {
            accessToken,
        };
    }

    static async logout(refreshToken: string) {
        if (!refreshToken) {
            throw new Error("Refresh token required");
        };
        return await AuthRepo.logOut(refreshToken);
    }
}