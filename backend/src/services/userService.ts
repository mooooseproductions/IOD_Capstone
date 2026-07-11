import bcrypt from "bcryptjs";
import { UserRepo } from '../repositories/userRepo';

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
        const existingEmail = await UserRepo.checkEmailExists(user.email)
        if (existingEmail) {
            throw new Error("User email already exists")
        };

        const existingHandle = await UserRepo.checkHandleExists(user.email)
        if (existingHandle) {
            throw new Error("User handle already taken")
        };

        const encryptPassword = await bcrypt.hash(user.password, 10);

        return await UserRepo.registerUser(user, encryptPassword);
    }

    static async updateUser(update: any) {
        if(update.email) {
            throw new Error("Account email cannot be changed")
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
            password: newPassword || undefined
        }

        return await UserRepo.updateUser(update.id, updateData);
    }
}