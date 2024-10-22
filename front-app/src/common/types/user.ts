export interface User {
    id?: number;

    firstname: string;

    lastname: string;

    email: string;

    password: string;

    birthDate: Date;

    gender: string;

    phone: string;

    role: Role;

    roleId: number;
}

interface Role {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}
