import { UserInterface } from "../interfaces/authInterface";

export class UserDTO {
    id: number;
    email: string;
    handle: string;
    name: string;
    accountCreatedAt: Date;

    constructor(data: UserInterface) {
        this.id = data.id;
        this.email = data.email;
        this.handle = data.handle;
        this.name = data.name;
        this.accountCreatedAt = data.accountCreatedAt;
    }
}