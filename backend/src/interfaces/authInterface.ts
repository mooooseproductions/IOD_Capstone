export interface UserInterface {
    id: number;
    email: string;
    handle: string;
    name: string;
    password: string;
    status: string;
    role: string;
    accountCreatedAt: Date;
    accountClosedAt: Date|null;
}