import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export class UserService {

    static async registerUser(user: {
        name: string;
        handle: string;
        email: string;
        password: string;
    }) {
        // check mandatory fields completed
        if (!user.name || !user.handle || !user.email || !user.password) {
            throw new Error("Mandatory Fields Incomplete")
        };

        // check for existing record
        const existing = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        });

        if (existing) {
            throw new Error("User email already exists")
        };

        const encryptPassword = await bcrypt.hash(user.password, 10);

        return await prisma.user.create({
            data: {
                name: user.name,
                handle: user.handle,
                email: user.email,
                password: encryptPassword,
            }
        })
    }
}