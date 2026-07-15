import bcrypt from "bcryptjs";
import { UserRepo } from '../repositories/userRepo';

export class UserService {

    static async registerUser(user: {
        name: string;
        handle: string;
        email: string;
        password: string;
    }) {

        // check for existing record
        const existingEmail = await UserRepo.checkEmailExists(user.email)
        if (existingEmail) {
            throw new Error("User email already exists")
        };

        const existingHandle = await UserRepo.checkHandleExists(user.handle)
        if (existingHandle) {
            throw new Error("User handle already taken")
        };

        const encryptPassword = await bcrypt.hash(user.password, 10);

        return await UserRepo.registerUser(user, encryptPassword);
    }

    static async updateUser(update: any, credentials: any) { // needs role check to change status or role

        if (credentials.role !== "admin" && update.email) {
            throw new Error("Please contact administrator to change email")
        }

        if (credentials.role !== "admin" && update.role) {
            throw new Error("User privileges cannot update role")
        }

         if (credentials.role !== "admin" && update.status === "banned") {
            throw new Error("Only administrator can ban accounts")
        }

        let newPassword = null;
        if (update.password) {
            newPassword = await bcrypt.hash(update.password, 10);
        }

        let existingHandle = null;
        if (update.handle) {
            existingHandle = await UserRepo.checkHandleExists(update.handle);
            if (existingHandle) {
                throw new Error("User handle already taken")
            }
        }

        const updateData = {
            name: update.name || undefined,
            handle: update.handle || undefined,
            password: newPassword || undefined,
            status: update.status || undefined,
            role: update.role || undefined
        }

        return await UserRepo.updateUser(credentials.userId, updateData);
    }

    static async getUserDetails(id: number) {
        return await UserRepo.getUserDetails(id);
    }

    static async getAllUsers(status?: string) {
        return await UserRepo.getAllUsers(status || undefined);
    }

    static async removeUser(id: number) {
        return await UserRepo.removeUser(id);
    }

    static async getUserProfile(id: number) {
        return await UserRepo.getUserProfile(id);
    }
}