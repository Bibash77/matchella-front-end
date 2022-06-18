import { Role } from './role';

export class Account {
    id: string;
    title: string;
    fullName: string;
    username: string;
    lastName: string;
    email: string;
    role: Role;
    jwtToken?: string;
}
